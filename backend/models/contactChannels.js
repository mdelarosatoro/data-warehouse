const { DataTypes } = require("sequelize");
const sequelize = require("../conexion");

const ContactChannels = sequelize.define('contactChannels', {
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
    tableName: 'contact_channels',
    underscored: true,
})

module.exports = ContactChannels;