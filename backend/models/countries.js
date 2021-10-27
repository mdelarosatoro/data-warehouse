const { DataTypes } = require("sequelize");
const sequelize = require("../conexion");

const Countries = sequelize.define('countries', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    tableName: 'countries',
    underscored: true,
})

module.exports = Countries;