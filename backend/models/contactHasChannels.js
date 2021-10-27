const { DataTypes } = require("sequelize");
const sequelize = require("../conexion");
const Contacts = require("./contacts");
const ContactChannels = require("./contactChannels");

const ContactHasChannels = sequelize.define('contactHasChannels', {
    contactId: {
        type: DataTypes.INTEGER,
        references: {
            model: Contacts,
            key: 'id'
        }
    },
    contactChannelId: {
        type: DataTypes.INTEGER,
        references: {
            model: ContactChannels,
            key: 'id'
        }
    },
    contactInfo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preferred: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
},
{
    tableName: "contact_has_channels",
    underscored: true,
    timestamps: false,
})

module.exports = ContactHasChannels;