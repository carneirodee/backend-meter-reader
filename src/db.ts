import pg from 'pg'
import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import dotenv from 'dotenv';
import { Dialect } from 'sequelize';
const __dirname1 = path.resolve();
dotenv.config({ path: `${__dirname1}/src/environment.env` });

const database = process.env.NODE_ENV == 'production' ? process.env.DB_DATABASE : process.env.DB_DATABASE_TEST;
console.log(process.env.NODE_ENV)
const sequelize = new Sequelize( `${database}`, "postgres", "admin", {
  host: process.env.NODE_ENV == 'production' ? process.env.DB_HOST : process.env.DB_HOST_TEST,
  dialect: process.env.DB_DIALECT as Dialect,
  pool: {
    max: 9,
    min: 0,
    idle: 10000
  }
});
export default sequelize;
