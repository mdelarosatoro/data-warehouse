const { DataTypes } = require("sequelize");
const sequelize = require("../conexion");

const Contacts = sequelize.define('contacts', {
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
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    interest: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    profilePic: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
},
{
    tableName: 'contacts',
    underscored: true,
})

module.exports = Contacts;