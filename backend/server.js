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
    max: 30,
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
    path: ["/login", "/register"]
})
);

//ENDPOINTS

//Users-------
//POST - /register - create a new user in the DB
server.post("/register",
async (req, res) => {
    try {
        const {
            name,
            lastName,
            email,
            profilePicUrl,
            password
        } = req.body;

        //password hashing
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            const newUser = await Users.create({
                name,
                lastName,
                email,
                profilePicUrl,
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
                    { expiresIn: '60m' });
        
                    res.status(200).json({token});
                }
            });

        }
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

//levantar el servidor
server.listen(SERVER_PORT, () => {
    console.log(`Servidor inicializado correctamente en el puerto ${SERVER_PORT}.`)
});