import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { QueryTypes } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mssql',
  host: process.env.DB_HOST,
  logging: true,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialectOptions: {
    options: {
      requestTimeout: 60000 // Timeout in milliseconds
    }
  },
  pool: {
    acquire: 60000,
  },
  models: [__dirname + '/models'],
});

export {sequelize, QueryTypes};
