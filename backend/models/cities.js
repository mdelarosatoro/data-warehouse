const { DataTypes } = require("sequelize");
const sequelize = require("../conexion");

const Cities = sequelize.define('cities', {
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
    tableName: 'cities',
    underscored: true,
})

module.exports = Cities;