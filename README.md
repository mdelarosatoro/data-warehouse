# data-warehouse

Proyecto final de la carrera de Desarrollo Web Full Stack de Acámica. Consiste en la creación de un Data Warehouse para que una empresa pueda administrar datos de usuarios, regiones, países, ciudades, compañías, contactos y canales de contacto.

## Instrucciones de instalación

1. Para empezar, deberá clonar el repositorio y correr npm install tanto en la carpeta de frontend como en la de backend para instalar las dependencias de cada uno.

2. Una vez instaladas las dependencias del front y el back, deberá utilizar un servidor de mysql y crear una base de datos.

3. Crear un archivo `.env` y actualizarlo con la información de su base de datos, ya que el servidor utilizará esta información para conectarse a su base de datos. Utilice el archivo `.env.example` para copiar el nombre de las variables y llenar los datos del archivo `.env` con sus variables de entorno. Recomiendo no cambiar el puerto del servidor (3000), ya que el front realizará las peticiones a este puerto.

4. Ingresar al archivo /backend/models/index.js y descomentar las líneas 59 hasta la 114. Este código se encargará de crear todas las tablas y asociaciones cuando levante el servidor, además de crear un set de datos de prueba iniciales e ingresarlos en la DB.

5. En el terminal, navegar al archivo /backend y correr la instrucción `nodemon server.js` de haber instalado las dependencias y configurar las variables de su entorno correctamente, deberá recibir la siguiente respuesta en consola:

```
  Servidor inicializado correctamente en el puerto 3000.
Executing (default): SELECT 1+1 AS result
Executing (default): DROP TABLE IF EXISTS `contact_has_channels`;
conexión exitosa con la db...
Executing (default): DROP TABLE IF EXISTS `contact_channels`;
Executing (default): DROP TABLE IF EXISTS `contacts`;
Executing (default): DROP TABLE IF EXISTS `companies`;
Executing (default): DROP TABLE IF EXISTS `cities`;
Executing (default): DROP TABLE IF EXISTS `countries`;
Executing (default): DROP TABLE IF EXISTS `regions`;
Executing (default): DROP TABLE IF EXISTS `users`;
Executing (default): DROP TABLE IF EXISTS `users`;
Executing (default): CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255) NOT NULL, `last_name` VARCHAR(255) NOT NULL, `email` VARCHAR(255) NOT NULL, `profile_pic_url` VARCHAR(255), `password` VARCHAR(255) NOT NULL, `is_admin` TINYINT(1) NOT NULL DEFAULT true, `active` TINYINT(1) NOT NULL DEFAULT true, `created_at` DATETIME NOT NULL, `updated_at` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `users`
Executing (default): DROP TABLE IF EXISTS `regions`;
Executing (default): CREATE TABLE IF NOT EXISTS `regions` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255) NOT NULL, `created_at` DATETIME NOT NULL, `updated_at` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `regions`
Executing (default): DROP TABLE IF EXISTS `countries`;
Executing (default): CREATE TABLE IF NOT EXISTS `countries` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255) NOT NULL, `created_at` DATETIME NOT NULL, `updated_at` DATETIME NOT NULL, `region_id` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `countries`
Executing (default): DROP TABLE IF EXISTS `cities`;
Executing (default): CREATE TABLE IF NOT EXISTS `cities` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255) NOT NULL, `created_at` DATETIME NOT NULL, `updated_at` DATETIME NOT NULL, `country_id` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `cities`
Executing (default): DROP TABLE IF EXISTS `companies`;
Executing (default): CREATE TABLE IF NOT EXISTS `companies` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255) NOT NULL, `address` VARCHAR(255) NOT NULL, `email` VARCHAR(255) NOT NULL, `telephone` VARCHAR(255) NOT NULL, `active` TINYINT(1) NOT NULL DEFAULT true, `created_at` DATETIME NOT NULL, `updated_at` DATETIME NOT NULL, `city_id` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `companies`
Executing (default): DROP TABLE IF EXISTS `contacts`;
Executing (default): CREATE TABLE IF NOT EXISTS `contacts` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255) NOT NULL, `last_name` VARCHAR(255) NOT NULL, `position` VARCHAR(255) NOT NULL, `email` VARCHAR(255) NOT NULL, `address` VARCHAR(255) NOT NULL, `interest` FLOAT NOT NULL DEFAULT 0, `profile_pic` VARCHAR(255), `is_active` TINYINT(1) NOT NULL DEFAULT true, `created_at` DATETIME NOT NULL, `updated_at` DATETIME NOT NULL, `city_id` INTEGER, `company_id` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `contacts`
Executing (default): DROP TABLE IF EXISTS `contact_channels`;
Executing (default): CREATE TABLE IF NOT EXISTS `contact_channels` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255) NOT NULL, `created_at` DATETIME NOT NULL, `updated_at` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `contact_channels`
Executing (default): DROP TABLE IF EXISTS `contact_has_channels`;
Executing (default): CREATE TABLE IF NOT EXISTS `contact_has_channels` (`contact_id` INTEGER , `contact_channel_id` INTEGER , `contact_info` VARCHAR(255) NOT NULL, `preferred` TINYINT(1) NOT NULL DEFAULT false, UNIQUE `contact_has_channels_contactChannelId_contactId_unique` (`contact_id`, `contact_channel_id`), PRIMARY KEY (`contact_id`, `contact_channel_id`), FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`contact_channel_id`) REFERENCES `contact_channels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `contact_has_channels`
Executing (default): INSERT INTO `users` (`id`,`name`,`last_name`,`email`,`password`,`is_admin`,`active`,`created_at`,`updated_at`) VALUES (DEFAULT,?,?,?,?,?,?,?,?);
Executing (default): INSERT INTO `regions` (`id`,`name`,`created_at`,`updated_at`) VALUES (DEFAULT,?,?,?);
Executing (default): INSERT INTO `countries` (`id`,`name`,`created_at`,`updated_at`) VALUES (DEFAULT,?,?,?);
Executing (default): UPDATE `countries` SET `region_id`=?,`updated_at`=? WHERE `id` = ?
Executing (default): INSERT INTO `cities` (`id`,`name`,`created_at`,`updated_at`) VALUES (DEFAULT,?,?,?);
Executing (default): UPDATE `cities` SET `country_id`=?,`updated_at`=? WHERE `id` = ?
Executing (default): INSERT INTO `companies` (`id`,`name`,`address`,`email`,`telephone`,`active`,`created_at`,`updated_at`) VALUES (DEFAULT,?,?,?,?,?,?,?);
Executing (default): UPDATE `companies` SET `city_id`=?,`updated_at`=? WHERE `id` = ?
Executing (default): INSERT INTO `contact_channels` (`id`,`name`,`created_at`,`updated_at`) VALUES (DEFAULT,?,?,?);
Executing (default): INSERT INTO `contact_channels` (`id`,`name`,`created_at`,`updated_at`) VALUES (DEFAULT,?,?,?);
Executing (default): INSERT INTO `contact_channels` (`id`,`name`,`created_at`,`updated_at`) VALUES (DEFAULT,?,?,?);
Executing (default): INSERT INTO `contacts` (`id`,`name`,`last_name`,`position`,`email`,`address`,`interest`,`profile_pic`,`is_active`,`created_at`,`updated_at`) VALUES (DEFAULT,?,?,?,?,?,?,?,?,?,?);
Executing (default): UPDATE `contacts` SET `city_id`=?,`updated_at`=? WHERE `id` = ?
Executing (default): UPDATE `contacts` SET `company_id`=?,`updated_at`=? WHERE `id` = ?
Executing (default): INSERT INTO contact_has_channels (contact_id, contact_channel_id, contact_info, preferred)
        VALUES (1, 1, '+51 979 301 974', true);
Executing (default): INSERT INTO contact_has_channels (contact_id, contact_channel_id, contact_info, preferred)
        VALUES (1, 2, 'contact@email.com', true);
Executing (default): INSERT INTO contact_has_channels (contact_id, contact_channel_id, contact_info, preferred)
        VALUES (1, 3, 'Test LinkedIn', true);
```

Esto significa que el servidor se levantó correctamente y se crearon las tablas y datos de prueba exitosamente. Puede comprobar esto revisando su DB.

6. Vuelva a comentar las líneas 59 hasta 114 del archivo `/backend/models/index.js`, ya que ya no será necesario tener este código activo, a menos que se desee resetear la base de datos cada vez que se levante el servidor.

7. Con el servidor corriendo, abrimos una segunda terminal y nos ubicamos en la carpeta `/frontend`.

8. Corremos la instrucción `npm start`, la cual se encargará de levantar el servidor de react.

9. Hacer log in con el siguiente usuario de prueba: `email: test@test.com, password: 123456`

10. En la pestaña Usuarios puede crear un nuevo usuario con su información.

11. En la pestaña Regiones podrá crear una región y agregarle países, y a los países les podrá agregar ciudades.

12. En la pestaña Compañías podrá agregar información de empresas diversas.

13. En la pestaña contactos podrá generar contactos y enlazarlos con las regiones y compañías previamente creadas, por lo cual le recomiendo primero crear las regiones y compañías y finalmente el contacto para poder enlazar todos los datos.
