import dotenv from 'dotenv';
import sequelize from './db';
import Customer from './models/customer';
import Customer_Address from './models/customer-address';
import Measure from './models/measure';

const InitDB = () => {
  sequelize.authenticate().then(() => {
    console.log("Success!");
    sequelize.addModels([Customer, Customer_Address, Measure]);
    Customer.sync();
    Customer_Address.sync();
    Measure.sync();
  }).catch((err: any) => {
    console.log(err);
  });
}

export default InitDB;
