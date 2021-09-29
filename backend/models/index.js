const sequelize = require("../conexion");

const Users = require("./users");

// (async () => {
//     try {
//         await sequelize.sync({force: true});
//     } catch (error) { 
//         console.error(error.message);
//     }
// })();

module.exports = {
    Users
};