import MeasureRepository from "../repositories/measure.repository";
import { validateConfirmValue, validateMeasureType, validateReadingMeter } from "../validators/validations";
import { analyzeImage } from '../services/gemini.service';
import { uploadImage } from '../services/upload.service';
import Measure from "../models/measure";
export default class MeasureConntroller {
  constructor() {
  }
  repository = new MeasureRepository();

  get = async (req: any, res: any, next: any) => {
    try {
      console.log('Teste')
      var data = await this.repository.getAll();
      console.log("DATA", data,)
      res.status(200).send(data)
    } catch (erro) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  }

  getById = async (req: any, res: any, next: any) => {
    let id = req.params.id
    try {
      var data = await this.repository.getById(id)
      console.log('DATA')
      res.status(200).send(data)
    } catch (erro) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  }

  getByCustomerCode = async (req: any, res: any, next: any) => {
    let { id } = req.params
    let { measure_type } = req.query;
    let data = [];
    try {
      if (measure_type) {
        if (validateMeasureType(measure_type)) {
          data = await this.repository.getByCustomerCodeAndType(id, measure_type);
        } else {
          res.status(400).send({
            error_code: 'INVALID_TYPE',
            error_description: 'Tipo de medição não permitida'
          })
          return;
        }
      } else {
        data = await this.repository.getByCustomerCode(id);
      }
      if (data.length == 0) {
        res.status(404).send({
          error_code: 'MEASURE_NOT_FOUND',
          error_description: 'Nenhuma leitura encontrada'
        })
        return;
      }
      var result = {
        customer_code: id,
        data
      }
      console.log('DATA')
      res.status(200).send(result)
    } catch (erro) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  }

  post = async (req: any, res: any, next: any) => {
    var data: any = []
    try {
      const { image, customer_code, measure_datetime, measure_type } = req.body;
      let valid = validateReadingMeter({ image, customer_code, measure_datetime, measure_type });
      if (valid.error) {
        res.status(400).send({
          error_code: 'INVALID_DATA',
          error_description: valid.error.details[0].message
        })
        return
      }
      data = await this.repository.getByCustomerCode(customer_code);
      if (data.length > 0) {

        const current_year = measure_datetime.slice(0, 4);
        const current_month = measure_datetime.slice(5, 7)
        for (let i = 0; i < data.length; i++) {
          const month = data[i].measure_datetime.getMonth() + 1;
          const year = data[i].measure_datetime.getFullYear();
          if (current_year == year && current_month == month) {
            return res.status(409).send({
              error_code: 'DOUBLE_REPORT',
              error_description: 'Leiture do mês já realizada'
            })
          }
        }

      }

      const measure_value = parseInt(await analyzeImage(image))
      console.log('Value', measure_value)
      const uploadResult = uploadImage(image);
      if (!uploadResult) {
        return res.status(400).send({
          error_code: 'INVALID_DATA',
          error_description: 'Upload de imagem não foi feito'
        })
      } else {
        let measure = {
          image_url: uploadResult,
          customer_code,
          measure_datetime,
          measure_type,
          measure_value
        }
        var measure_inserted = await this.repository.create(measure)
        res.status(200).send({
          image_url: uploadResult,
          measure_value,
          measure_uuid: measure_inserted.measure_uuid
        })

      }

    } catch (erro) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição' + erro
      })
    }
  }

  put = async (req: any, res: any, next: any) => {
    let id = req.params.id
    try {
      var data = await this.repository.update(id, req.body)
      res.status(200).send(data)
    } catch (erro) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  }

  patch = async (req: any, res: any, next: any) => {
    let { measure_uuid, confirmed_value } = req.body;
    try {
      let valid = validateConfirmValue({ measure_uuid, confirmed_value });
      if (valid.error) {
        res.status(400).send({
          error_code: 'INVALID_DATA',
          error_description: valid.error.details[0].message
        })
        return
      }
      let measure = await this.repository.getById(measure_uuid);
      if (!measure) {
        res.status(404).send({
          error_code: 'MEASURE_NOT_FOUND',
          error_description: 'Leitura do mês não foi encontrada'
        })
        return
      }
      if (measure.has_confirmed == 1) {
        res.status(409).send({
          error_code: 'CONFIRMATION_DUPLICATE',
          error_description: 'Leitura do mês já foi realizada'
        })
        return
      }
      await this.repository.updateValue(measure_uuid, confirmed_value);
      res.status(200).send({ success: true })
    } catch (erro) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição+' + erro
      })
    }
  }


  delete = async (req: any, res: any, next: any) => {
    let id = req.params.id
    try {
      await this.repository.deleteById(id)
      res.status(200).send({
        message: 'Deleted'
      })
    } catch (erro) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  }
}