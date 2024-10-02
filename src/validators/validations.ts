import Joi, { LanguageMessages } from "joi";
import { cpf } from 'cpf-cnpj-validator';
import { cnpj } from 'cpf-cnpj-validator';

export const validateUUID = (uuidCheck: any) => {
    const confirmationSchema = Joi.object({
        id: Joi.string().uuid().required(),
    });

    return confirmationSchema.validate(uuidCheck);
}

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

export const validateCode = (code: any) => {
    code.replace('.', '');
    code.replace('-', '');
    if (cpf.isValid(code)) {
        return true
    } else if (cnpj.isValid(code)) {
        return true
    } else {
        return false
    }

}