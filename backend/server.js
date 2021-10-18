//importar librerías
const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();

//puerto del servidor
const { SERVER_PORT } = process.env;

//importar modelos del
const { Users } = require("./models");

//password hashing rounds
const saltRounds = 10;

//secret key
const { JWT_SECRET } = process.env;

//crear instancia del server en express
const server = express();

//politica de limite de peticiones
const limiter = rateLimit({
    windowMs: 10 * 1000,
    max: 40,
    message: "Excediste el número de peticiones. Intenta más tarde."
});

//logger
const logger = (req, res, next) => {
    const path = req.path;
    const method = req.method;
    const body = req.body;

    process.nextTick( () => {console.log(`
    Método: ${method}
    Ruta: ${path}
    Body: ${JSON.stringify(body)}
    Params: ${JSON.stringify(req.params)}
    `)});

    next();
}

//middlewares globales
server.use(express.json());
server.use(compression());
server.use(helmet());
server.use(cors());
server.use(limiter);
server.use(logger);

//proteger endpoints menos el login y registro
server.use(expressJwt({
    secret: JWT_SECRET,
    algorithms: ["HS256"],
}).unless({
    path: ["/login"]
})
);

//MIDDLEWARES
const validarCamposRegistro = (req, res ,next) => {
    const {
        name,
        lastName,
        email,
        isAdmin,
        password
    } = req.body;

    if (
        !name || name == '' ||
        !lastName || lastName == '' ||
        !email || email == '' ||
        !isAdmin || isAdmin == '' ||
        !password || password == ''
    ){
        res.status(400).json({error: `Debe ingresar todos los campos.`})
    } else {
        next();
    }
}

const validateAdmin = async (req, res, next) => {
    const userEmail = req.user.email;

    const possibleAdmin = await Users.findOne({
        where: { email: userEmail }
    })

    if (possibleAdmin.isAdmin) {
        next();
    } else {
        res.status(400).json({error: `User ${userEmail} is not admin`})
    }
}

//ENDPOINTS

//Users-------
//POST - /register - create a new user in the DB
server.post("/register",
validateAdmin,
validarCamposRegistro,
async (req, res) => {
    try {
        const {
            name,
            lastName,
            email,
            profilePicUrl,
            isAdmin,
            password
        } = req.body;

        //password hashing
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            const newUser = await Users.create({
                name,
                lastName,
                email,
                profilePicUrl,
                isAdmin,
                password: hash
            });

            res.status(201).json(newUser);
        })
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

//LOGIN - /login - log in a user into the app
server.post('/login',
async (req, res) => {
    try {
        const { email, password } = req.body;

        const possibleUser = await Users.findOne({
            where: { email }
        });

        if (!possibleUser) {
            res.status(401).json({error: `Wrong email or password. Please try again.`});
        } else {
            const hash = possibleUser.password;

            bcrypt.compare(password, hash, function(err, result) {
                if (!result) {
                    res.status(401).json({error: `Wrong email or password. Please try again.`})
                } else {
                    const token = jwt.sign({
                        id: possibleUser.id,
                        email: possibleUser.email,
                        name: possibleUser.name,
                        lastName: possibleUser.lastName,
                    },
                    JWT_SECRET,
                    { expiresIn: '30m' });
        
                    res.status(200).json({token});
                }
            });

        }
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

//GET ALL USERS IN THE DB
server.get('/all-users',
validateAdmin,
async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        });

        res.status(200).json(users);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
})

//editar información de un usuario
server.put('/users/:userId',
validateAdmin,
async (req, res) => {
    try {
        const {
            name,
            lastName,
            isAdmin
        } = req.body;

        await Users.update(
                {
                    name,
                    lastName,
                    isAdmin
                },
                {
                    where: {
                        id: req.params.userId
                    }
                }
            );

        res.status(200).json(`User updated succesfully`)
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

//USER-DATA Retrieve user data
server.get('/user-data',
async (req, res) => {  
    try {
        const userEmail = req.user.email;
    
        const userDb = await Users.findOne({
            where: { email: userEmail }
        })

        res.status(200).json(userDb);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

//logged in test
server.get("/test", (req, res) => {
    try {
        res.status(200).json('success')
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

//levantar el servidor
server.listen(SERVER_PORT, () => {
    console.log(`Servidor inicializado correctamente en el puerto ${SERVER_PORT}.`)
});