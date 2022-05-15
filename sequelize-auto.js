const SequelizeAuto = require('sequelize-auto');
const dotenv = require('dotenv');
dotenv.config();

const auto = new SequelizeAuto(process.env.DB_SCHEMA,process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    directory: './src/models', // where to write files
    port: process.env.DB_PORT,
    caseModel: 'c', // convert snake_case column names to camelCase field names: user_id -> userId
    caseFile: 'c', // file names created for each model use camelCase.js not snake_case.js
})

auto.run();