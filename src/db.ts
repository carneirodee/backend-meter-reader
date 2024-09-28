import dotenv from 'dotenv'
import { Sequelize } from 'sequelize-typescript';

dotenv.config()
const sequelize = new Sequelize("measure-database", "root", "root", {
  host: "db",
  dialect: "mysql",
  pool: {
    max: 9,
    min: 0,
    idle: 10000
  }
});
export default sequelize;
