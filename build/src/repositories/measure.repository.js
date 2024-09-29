import Measure from "../models/measure";
export default class MeasureRepository {
    constructor() {
    }
    getAll = async () => {
        const measure = await Measure.findAll();
        return measure;
    };
    getById = async (id) => {
        const measure = await Measure.findOne({
            where: {
                measure_uuid: id
            }
        });
        return measure;
    };
    getByCustomerCode = async (id) => {
        const measure = await Measure.findAll({
            where: {
                customer_code: id
            }
        });
        return measure;
    };
    getByCustomerCodeAndType = async (id, type) => {
        const measure = await Measure.findAll({
            where: {
                customer_code: id,
                measure_type: type
            }
        });
        return measure;
    };
    create = async (data) => {
        console.log("DATA", data);
        const measure = await Measure.create(data);
        return measure.save();
    };
    update = async (id, data) => {
        const measure = await Measure.update({ data }, { where: { id }, returning: true });
        return measure;
    };
    updateValue = async (id, value) => {
        const measure = await Measure.update({
            measure_value: value,
            has_confirmed: 1
        }, { where: { measure_uuid: id }, returning: true });
        return measure;
    };
    deleteById = async (id) => {
        await Measure.destroy({ where: { id } });
    };
}
