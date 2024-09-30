
import path from 'path';
import dotenv from 'dotenv';
const __dirname1= path.resolve();
dotenv.config({ path: `${__dirname1}/src/envoriment.env` });
export default {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,   
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,   
    dialect: 'postgres',
    logging: true
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,   
    port: process.env.PORT,   
    dialect: process.env.DB_DIALECT,
    logging: true
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,   
    port: process.env.PORT,   
    dialect: process.env.DB_DIALECT,
  }
};