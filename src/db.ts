import pg from 'pg'
import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import dotenv from 'dotenv';
const __dirname1 = path.resolve();
dotenv.config({ path: `${__dirname1}/src/environment.env` });

const database = process.env.NODE_ENV == 'development' ? process.env.DB_DATABASE : process.env.DB_DATABASE_TEST;

const sequelize = new Sequelize( `${database}`, "postgres", "admin", {
  host: process.env.NODE_ENV == 'development' ? process.env.DB_HOST : process.env.DB_HOST_TEST,
  dialect: "postgres",
  pool: {
    max: 9,
    min: 0,
    idle: 10000
  }
});
export default sequelize;
