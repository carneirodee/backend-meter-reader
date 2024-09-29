import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import dotenv from 'dotenv';
const __dirname1= path.resolve();
dotenv.config({ path: `${__dirname1}/src/.env` });
const sequelize = new Sequelize("postgres", "postgres", "admin", {
  host: process.env.DB_HOST,
  dialect: "postgres",
  pool: {
    max: 9,
    min: 0,
    idle: 10000
  }
});
export default sequelize;
