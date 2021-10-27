const { DataTypes } = require("sequelize");
const sequelize = require("../conexion");

const Regions = sequelize.define('regions', {
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
    tableName: 'regions',
    underscored: true,
})

module.exports = Regions;