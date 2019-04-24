const Sequelize = require('sequelize');
const Config = require('../config');

const sequelize = new Sequelize(Config.DB_NAME, Config.DB_USER, Config.DB_PASSWORD, {
    host: Config.DB_HOST,
    dialect: 'mysql'
});

module.exports = sequelize;
