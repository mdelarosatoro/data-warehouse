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
const { Op } = require('sequelize');
const sequelize = require("./conexion");

//puerto del servidor
const { SERVER_PORT } = process.env;

//importar modelos del
const {
    Users,
    Regions,
    Countries,
    Cities,
    Companies,
    Contacts,
    ContactChannels,
    ContactHasChannels
} = require("./models");

//password hashing rounds
const saltRounds = 10;

//secret key
const { JWT_SECRET } = process.env;

//crear instancia del server en express
const server = express();

//politica de limite de peticiones
const limiter = rateLimit({
    windowMs: 10 * 1000,
    max: 100,
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
    try {
        const users = await Users.findAll({});
        if (users.length === 0) {
            next();
        } else {
            const userEmail = req.user.email;
            console.log(userEmail)
        
            const possibleAdmin = await Users.findOne({
                where: { email: userEmail }
            })
        
            if (possibleAdmin.isAdmin) {
                next();
            } else {
                res.status(400).json({error: `User ${userEmail} is not admin`})
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
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
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            where: {
                active: true
            }
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

//desactivar un usuario
server.delete('/users/:userId',
validateAdmin,
async(req, res) => {
    try {
        const userId = req.params.userId;

        await Users.update(
            { active: false },
            {
                where: { id: userId }
            }
        )
        
        res.status(200).json(`User deleted succesfully.`)
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

//PAISES Y REGIONES ----------------------------------------------------------------
//Create a new region
server.post('/regions', async (req, res) => {
    try {
        const { name } = req.body;

        const newRegion = await Regions.create({
            name
        })

        res.status(201).json(newRegion);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

//Get all regions
server.get('/regions', async (req, res) => {
    try {
        const regions = await Regions.findAll({
            include: [
                {
                    model: Countries,
                    include: [
                        {model: Cities}
                    ]
                },
            ]
        });

        res.status(200).json(regions);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

//Create a new country
server.post('/countries', async (req, res) => {
    try {
        const { name, regionId } = req.body;

        const newCountry = await Countries.create({
            name
        })

        await newCountry.setRegion(regionId)

        res.status(201).json(newCountry);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

server.get('/countries/:regionId', async (req, res) => {
    try {
        const { regionId } = req.params;

        const countries = await Countries.findAll({
            where: {
                region_id: regionId
            }
        });

        res.status(200).json(countries);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

server.get('/countries/:countryId', async (req, res) => {
    try {
        const { countryId } = req.params;

        const country = await Cities.findAll({
            where: {
                id: countryId
            }
        })

        res.status(200).json(country);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});


server.put('/countries/:countryId', async (req, res) => {
    try {
        const { name, countryId } = req.body;

        const editedCountry = await Countries.update({
            name
        },{
            where: { id: countryId }
        })

        res.status(201).json(editedCountry);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

server.delete('/countries/:countryId', async (req, res) => {
    try {
        const { countryId } = req.params;

        await Cities.destroy({
            where: { country_id: countryId }
        })

        await Countries.destroy({
            where: { id: countryId }
        })


        res.status(201).json(`Se eliminó el país y sus ciudades correctamente`);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

//Create a new city
server.post('/cities', async (req, res) => {
    try {
        const { name, countryId } = req.body;

        const newCity = await Cities.create({
            name
        })

        await newCity.setCountry(countryId);

        res.status(201).json(newCity);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

server.get('/cities/:countryId', async (req, res) => {
    try {
        const { countryId } = req.params;

        const cities = await Cities.findAll({
            where: {
                country_id: countryId
            }
        });

        res.status(200).json(cities);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

server.get('/cities/:cityId', async (req, res) => {
    try {
        const { cityId } = req.params;

        const city = await Cities.findAll({
            where: {
                id: cityId
            }
        })

        res.status(200).json(city);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

server.put('/cities/:cityId', async (req, res) => {
    try {
        const { name, cityId } = req.body;

        const editedCity = await Cities.update({
            name
        },{
            where: { id: cityId }
        })

        res.status(201).json(editedCity);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

server.delete('/cities/:cityId', async (req, res) => {
    try {
        const { cityId } = req.params;

        await Cities.destroy({
            where: { id: cityId }
        })

        res.status(201).json(`Se eliminó la ciudad correctamente`);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

//COMPANIES -----------------------------------------------------
server.post('/companies', async (req, res) => {
    try {
        const {
            name,
            address,
            email,
            telephone,
            cityId
        } = req.body;

        const newCompany = await Companies.create({
            name,
            address,
            email,
            telephone,
        });

        await newCompany.setCity(cityId);

        res.status(201).json(newCompany)
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

server.get('/companies', async (req, res) => {
    try {
        const companies = await Companies.findAll({
            where: {active: true},
            include: [
                {
                    model: Cities
                }
            ]
        });

        res.status(200).json(companies);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

server.put('/companies/:companyId', async (req, res) => {
    try {
        const { companyId } = req.params;

        const {
            name,
            address,
            email
        } = req.body;

        await Companies.update({
            name,
            address,
            email
        },{
            where: { id: companyId }
        })

        res.status(201).json('Empresa editada correctamente.')
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

server.delete('/companies/:companyId', async (req, res) => {
    try {
        const { companyId } = req.params;

        await Companies.update({
            active: false
        },{
            where: { id:companyId }
        })

        res.status(201).json(`Se eliminó la empresa correctamente`);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

//CONTACTOS ----------------------------------------------------------
server.post('/contacts', async (req, res) => {
    try {
        const {
            name,
            lastName,
            position,
            email,
            companyId,
            locationInfo,
            interest,
            contactChannels,
            profilePic
        } = req.body;

        const newContact = await Contacts.create({
            name,
            lastName,
            position,
            email,
            interest,
            address: locationInfo.address,
            profilePic
        })

        await newContact.setCompany(companyId);
        await newContact.setCity(locationInfo.cityId);

        if (contactChannels.length > 0) {
            for (const contactChannel of contactChannels) {
                await sequelize.query(`
                INSERT INTO contact_has_channels (contact_id, contact_channel_id, contact_info, preferred)
                VALUES (${newContact.id}, ${contactChannel.contactChannelId}, '${contactChannel.contactInfo}', ${contactChannel.preferred})
                `)
            }
        }

        res.status(201).json(`Nuevo contacto creado correctamente`)
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

server.put('/contacts/:contactId', async (req, res) => {
    try {
        const { contactId } = req.params;

        const {
            name,
            lastName,
            position,
            email,
            companyId,
            locationInfo,
            interest,
            contactChannels,
            profilePic
        } = req.body;

        await Contacts.update(
            {
                name,
                lastName,
                position,
                email,
                interest,
                address: locationInfo.address
            },
            {
                where: { id: contactId },
            }
        )
        
        const editedContact = await Contacts.findOne(
            {
                where: { id: contactId }
            }
        );
        console.log(editedContact)

        await editedContact.setCompany(companyId);
        await editedContact.setCity(locationInfo.cityId);
        
        await ContactHasChannels.destroy({
            where: { contact_id: contactId },
        })

        if (contactChannels.length > 0) {
            for (const contactChannel of contactChannels) {
                await sequelize.query(`
                INSERT INTO contact_has_channels (contact_id, contact_channel_id, contact_info, preferred)
                VALUES (${editedContact.id}, ${contactChannel.contactChannelId}, '${contactChannel.contactInfo}', ${contactChannel.preferred})
                `)
            }
        }

        res.status(200).json(`Contacto editado correctamente.`)
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
})

server.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contacts.findAll({
            attributes: ['id', 'name', 'lastName', 'position', 'email', 'address', 'interest', 'profile_pic'],
            include: [
                {
                    model: Companies,
                    attributes: ['id', 'name', 'address', 'email', 'telephone', 'active']
                },
                {
                    model: Cities,
                    attributes: ['id', 'name']
                },
                {
                    model: ContactChannels,
                    through: { attributes: ['contactInfo', 'preferred'] },
                    attributes: ['id', 'name']
                },
            ],
            where: { isActive: true }
        })

        res.status(200).json(contacts);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

server.get('/contacts/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const contact = await Contacts.findAll({
            where: { id: id },
            attributes: ['id', 'name', 'lastName', 'position', 'email', 'address', 'interest', 'profile_pic'],
            include: [
                {
                    model: Companies,
                    attributes: ['id', 'name', 'address', 'email', 'telephone', 'active']
                },
                {
                    model: Cities,
                    attributes: ['id', 'name']
                },
                {
                    model: ContactChannels,
                    through: { attributes: ['contactInfo', 'preferred'] },
                    attributes: ['id', 'name']
                },
            ],
        })

        res.status(200).json(contact);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

server.delete('/contacts/:contactId', async (req, res) => {
    try {
        const { contactId } = req.params;

        await Contacts.update({
            isActive: false
        }, {
            where: { id: contactId }
        })

        res.status(200).json('Contacto eliminado correctamente')

    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
})

//contact search
server.post('/contact-search', async (req, res) => {
    try {
        const { query } = req.body;

        const foundContacts = await Contacts.findAll({
            attributes: ['id', 'name', 'lastName', 'position', 'email', 'address', 'interest', 'profile_pic'],
            include: [
                {
                    model: Companies,
                    attributes: ['id', 'name', 'address', 'email', 'telephone', 'active']
                },
                {
                    model: Cities,
                    attributes: ['id', 'name']
                },
                {
                    model: ContactChannels,
                    through: { attributes: ['contactInfo', 'preferred'] },
                    attributes: ['id', 'name']
                },
            ],
            where: {
                [Op.or]: [
                    { name: {[Op.substring]: query} },
                    { lastName: {[Op.substring]: query} },
                    { position: {[Op.substring]: query} },
                    { email: {[Op.substring]: query} },
                    { address: {[Op.substring]: query} },
                    { interest: {[Op.substring]: query} },
                ],
                isActive: true
            }
        })

        res.status(200).json(foundContacts);
        
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
});

//CONTACT CHANNELS --------------------------------
server.get('/contact-channels', async (req, res) => {
    try {
        const contactChannels = await ContactChannels.findAll({});

        res.status(200).json(contactChannels);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
})

server.post('/contact-channels', async (req, res) => {
    try {
        const { name } = req.body;

        const newContactChannel = await ContactChannels.create({
            name
        });

        res.status(201).json(newContactChannel);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
})

//levantar el servidor
server.listen(SERVER_PORT, () => {
    console.log(`Servidor inicializado correctamente en el puerto ${SERVER_PORT}.`)
});