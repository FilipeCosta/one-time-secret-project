const Sequelize = require("sequelize");

const config = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD, // usually this type of information is place during the build process, but for the sake of simplicity I leave it here.
  database: process.env.MYSQL_DATABASE,
  dialect: "mysql",
};

const { host, user, password, database, dialect } = config;

const sequelize = new Sequelize(database, user, password, {
  dialect,
  host,
});

module.exports = sequelize;
