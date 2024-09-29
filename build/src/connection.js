import sequelize from './db';
import Customer from './models/customer';
import Customer_Address from './models/customer-address';
import Measure from './models/measure';
const InitDB = async () => {
    sequelize.authenticate().then(() => {
        console.log("Success!");
    }).catch((err) => {
        console.log(err);
    });
    sequelize.addModels([Customer, Customer_Address, Measure]);
    Customer.sync();
    Customer_Address.sync();
    Measure.sync();
};
export default InitDB;
