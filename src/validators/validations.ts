import Joi, { LanguageMessages } from "joi";

export const validateConfirmValue = (data: { measure_uuid: string, confirmed_value: number }) => {

    const confirmationSchema = Joi.object({
        measure_uuid: Joi.string().uuid().required(),
        confirmed_value: Joi.number().required(),
    });

    return confirmationSchema.validate(data);
}

export const validateMeasureType = (measureType: string) => {
    return measureType === 'WATER' || measureType === 'GAS';
}

export const validateReadingMeter = (data: { image: string, customer_code: string, measure_datetime: string, measure_type: string }) => {

    const confirmationSchema = Joi.object({
        image: Joi.string().base64().required(),
        customer_code: Joi.string().uuid().required(),
        measure_datetime: Joi.string().required(),
        measure_type: Joi.string().custom((value, helper) => {
            if (!(value === 'WATER' || value === 'GAS')) {
                return helper.error('measure_type', { v: value });
            }

            return true;
        })
    });

    return confirmationSchema.validate(data);
}