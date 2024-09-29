import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import dotenv from 'dotenv';
const __dirname = path.resolve();
dotenv.config({ path: `${__dirname}/src/.env` });
const sequelize = new Sequelize("postgres", "postgres", "admin", {
    host: 'db',
    dialect: "postgres",
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
});
export default sequelize;
