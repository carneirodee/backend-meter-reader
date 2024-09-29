import dotenv from 'dotenv';
import sequelize from './db';
dotenv.config()

// Create the connection to database
const InitDB = () => {
  sequelize.authenticate().then(() => {
    console.log("Success!");
  }).catch((err: any) => {
    console.log(err);
  });
}

export default InitDB;
