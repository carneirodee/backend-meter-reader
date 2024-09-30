import pg from 'pg'
import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import dotenv from 'dotenv';
const __dirname1 = path.resolve();
dotenv.config({ path: `${__dirname1}/src/envoriment.env` });


const sequelize = new Sequelize( `${process.env.DB_DATABASE}`, "postgres", "admin", {
  host: process.env.DB_HOST,
  dialect: "postgres",
  pool: {
    max: 9,
    min: 0,
    idle: 10000
  }
});
export default sequelize;
