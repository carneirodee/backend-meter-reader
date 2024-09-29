import Customer_Address from "../models/customer-address";
export default class CustomerAddressRepository {
    constructor() {
    }
    getAll = async () => {
        const address = await Customer_Address.findAll();
        return address;
    };
    getById = async (id) => {
        const address = await Customer_Address.findOne({
            where: {
                id: id
            }
        });
        return address;
    };
    create = async (data) => {
        const customer = await Customer_Address.create({ data });
        return customer.save();
    };
    update = async (id, data) => {
        const customer = await Customer_Address.update({ data }, { where: { id }, returning: true });
        return customer;
    };
    deleteById = async (id) => {
        await Customer_Address.destroy({ where: { id } });
    };
}
