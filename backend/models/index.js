const sequelize = require("../conexion");


const Users = require("./users");
const Regions = require("./regions");
const Countries = require("./countries");
const Cities = require("./cities");
const Companies = require("./companies");
const Contacts = require("./contacts");
const ContactChannels = require("./contactChannels");
const ContactHasChannels = require("./contactHasChannels");

//Relaciones
//Regiones 1 y Paises muchos
Regions.hasMany(Countries, {
    foreignKey: 'region_id'
});
// Countries.belongsTo(Regions);
Countries.belongsTo(Regions, {
    foreignKey: 'region_id'
});

//Countries 1 y Ciudades muchas
Countries.hasMany(Cities, {
    foreignKey: 'country_id'
});
Cities.belongsTo(Countries, {
    foreignKey: 'country_id'
});

Cities.hasMany(Companies, {
    foreignKey: 'city_id'
});
Companies.belongsTo(Cities, {
    foreignKey: 'city_id'
});

//Contact associations
//every contact can have one city, one city can have many contacts
Cities.hasMany(Contacts, {
    foreignKey: 'city_id'
});
Contacts.belongsTo(Cities, {
    foreignKey: 'city_id'
});

//every contact can have one company, one company can have many contacts
Companies.hasMany(Contacts, {
    foreignKey: 'company_id'
});
Contacts.belongsTo(Companies, {
    foreignKey: 'company_id'
});

//one contact can have many contact channels and one contact channel can have many Contacts
Contacts.belongsToMany(ContactChannels, { through: ContactHasChannels });
ContactChannels.belongsToMany(Contacts, { through: ContactHasChannels });

(async () => {
    try {
        await sequelize.sync({force: true});
        await Users.create({
            name: "Test",
            lastName: "Test",
            email: "test@test.com",
            isAdmin: true,
            password: "$2a$10$zvqeDVCyB9o0Nff7I8E9O.wwYm5tKeil9shLAciIqZYQIrz8aKEKC"
        })

        const testRegion = await Regions.create({ name: 'South America' })
        const testCountry = await Countries.create({ name: 'Peru' })
        testCountry.setRegion(testRegion.id);
        const testCity = await Cities.create({ name: 'Lima', cityId: 1 })
        testCity.setCountry(testCountry.id);

        const testCompany = await Companies.create({
            name: "TestCompany",
            address: "123 Main St",
            email: "test@test.com",
            telephone: "123-123-123",
        })
        await testCompany.setCity(testCity);

        const testContactChannel = await ContactChannels.create({ name: 'Whatsapp' })

        const testContact = await Contacts.create({
            name: "Test",
            lastName: "Test",
            position: 'Marketing Manager',
            email: "testcontact@testcontact.com",
            address: "123 Main Contact St",
            interest: 0.5
        })
        await testContact.setCity(testCity.id);
        await testContact.setCompany(testCompany.id);
        await sequelize.query(`
        INSERT INTO contact_has_channels (contact_id, contact_channel_id, contact_info, preferred)
        VALUES (${testContact.id}, ${testContactChannel.id}, '+51 979 301 974', true);
        `)
    } catch (error) { 
        console.error(error.message);
    }
})();

module.exports = {
    Users,
    Regions,
    Countries,
    Cities,
    Companies,
    Contacts,
    ContactChannels,
    ContactHasChannels,
};