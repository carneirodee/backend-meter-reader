import Customer from "../models/customer";

export default class CustomerRepository {
    constructor() {
    }

    getAll = async () => {
        const customers = await Customer.findAll();
        return customers;
    }

    getById = async (id: any) => {
        const customers = await Customer.findOne({
            where: {
                id: id
            }
        });
        return customers;
    }

    create = async (data: any) => {
        const customer = await Customer.create(data);
        return customer.save();
    }
    update = async (id: number, data: any) => {
        const customer = await Customer.update(
            data,
            { where: { id }, returning: true }
        );
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

    deleteById = async (id: number) => {
        await Customer.destroy({ where: { id } });
    }

}