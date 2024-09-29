import Measure from "../models/measure";

export default class MeasureRepository {
    constructor() {
    }

    getAll = async () => {
        const measure = await Measure.findAll();
        return measure;
    }

    getById = async (id: any) => {
        const measure = await Measure.findOne({
            where: {
                measure_uuid: id
            }
        });
        return measure;
    }

    getByCustomerCode = async (id: any) => {
        const measure = await Measure.findAll({
            where: {
                customer_code: id
            }
        });
        return measure;
    }
    getByCustomerCodeAndType = async (id: any, type : string) => {
        const measure = await Measure.findAll({
            where: {
                customer_code: id,
                measure_type: type
            }
        });
        return measure;
    }

    create = async (data: any) => {
        console.log("DATA", data)
        const measure = await Measure.create( data);
        return measure.save();
    }

    update = async (id: number, data: Measure) => {
        const measure = await Measure.update(
            { data },
            { where: { id }, returning: true }
        );
        return measure;
    }

    updateValue = async (id: number, value: number) => {
        const measure = await Measure.update(
            {
                measure_value: value,
                has_confirmed: 1
            },
            { where: { measure_uuid: id }, returning: true }
        );
        return measure;
    }

    deleteById = async (id: number) => {
        await Measure.destroy({ where: { id } });
    }
}