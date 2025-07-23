const sequelize = require('sequelize');
require('dotenv').config()

const db = new sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
})

module.exports = db;