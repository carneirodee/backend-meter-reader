import Customer from "../models/customer";
import Customer_Address from "../models/customer-address";
import Measure from "../models/measure";

export default class CustomerRepository {
    constructor() {
    }

    getAll = async () => {
        const customers = await Customer.findAll();
        return customers;
    }

    getById = async (id: any) => {
        const customer = await Customer.findOne({
            where: {
                customer_code: id
            }
        });
        return customer;
    }

    getAddressByCustomerCode = async (id: any) => {
        const customer = await Customer_Address.findOne({
            where: {
                customer_code: id
            }
        });
        return customer;
    }

    create = async (data: any) => {
        const customer = await Customer.create(data);
        return customer.save();
    }
    update = async (customer_code: number, data: Customer) => {
        const customer = await Customer.findOne({
            where: {
                customer_code
            }
        })
        if (customer != null) {
            await Customer.update(
                data,
                { where: { customer_code }, returning: true }
            );
        }
        return customer;
    }

    authenticate = async (data: any) => {
        const customer = await Customer.findOne({
            where: {
                email: data.email,
                password: data.password
            }
        });
        return customer;
    }

    deleteById = async (customer_code: number) => {
        console.log("DELETING", customer_code)
        const customer = await Customer.findOne({
            where: {
                customer_code
            }
        })
        
        if (customer != null) {
            await Customer_Address.destroy({ where: { customer_code}})
            await Customer.destroy({ where: { customer_code } });
        }
        return customer
    }

}