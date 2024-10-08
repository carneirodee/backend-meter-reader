import MeasureRepository from "../repositories/measure.repository";
import { validateUUID, validateConfirmValue, validateMeasureType, validateReadingMeter } from "../validators/validations";
import { analyzeImage } from '../services/gemini.service';
import { uploadImage } from '../services/upload.service';
export default class MeasureConntroller {
  constructor() {
  }
  repository = new MeasureRepository();

  get = async (req: any, res: any, next: any) => {
    try {
      const data = await this.repository.getAll();
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
      let valid = validateUUID({ id: id });
      if (valid.error) {
        res.status(400).send({
          error_code: 'INVALID_ID',
          error_description: 'Id invalido'
        })
        return
      }
      const data = await this.repository.getById(id);
      if (data === null) {
        res.status(404).send({
          error_code: 'MEASURE_NOT_FOUND',
          error_description: 'Measure not found'
        })
      }
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
          error_code: 'MEASURES_NOT_FOUND',
          error_description: 'Nenhuma leitura encontrada'
        })
        return;
      }
      const result = {
        customer_code: id,
        measures: data
      }
      res.status(200).send(result)
    } catch (erro) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  }

  post = async (req: any, res: any, next: any) => {
    let data: any = []
    let error_description = '';
    try {
      const { image, customer_code, measure_datetime, measure_type } = req.body;
      let valid = validateReadingMeter({ image, customer_code, measure_datetime, measure_type });
      if (valid.error) {
        if (valid.error.details[0].message === '\"customer_code\" is not allowed to be empty') {
          error_description = 'Código de Cliente invalido';
        }
        if (valid.error.details[0].message === 'Error code \"measure_type\" is not defined, your custom type is missing the correct messages definition') {
          error_description = 'Tipo de leitura invalida';
        }
        if (valid.error.details[0].message === '\"measure_datetime\" is not allowed to be empty') {
          error_description = 'Data invalida';
        }
        if (valid.error.details[0].message === '\"image\" must be a valid base64 string') {
          error_description = 'Imagem invalida';
        }
        res.status(400).send({
          error_code: 'INVALID_DATA',
          error_description: error_description == '' ? valid.error.details[0].message : error_description
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
          const type = data[i].measure_type;
          if (measure_type === type && (current_year == year && current_month == month)) {
            return res.status(409).send({
              error_code: 'DOUBLE_REPORT',
              error_description: 'Leitura do mês já realizada'
            })
          }
        }

      }

      const measure_value = parseInt(await analyzeImage(image))
      console.log('Value', measure_value)
      const uploadResult = uploadImage(customer_code, image);
      if (!uploadResult) {
        return res.status(500).send({
          error_code: 'INVALID_DATA',
          error_description: 'Upload de imagem não foi feito'
        })
      } else {
        let measure = {
          image_url: uploadResult,
          customer_code,
          measure_datetime,
          measure_type,
          measure_value,
          has_confirmed: 0
        }
        const measure_inserted = await this.repository.create(measure)
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
    const { image, customer_code, measure_datetime, measure_type } = req.body;
    let measure = {}
    try {
      let valid = validateUUID({ id: id });
      if (valid.error) {
        res.status(400).send({
          error_code: 'INVALID_ID',
          error_description: 'Id invalido'
        })
        return
      }
      const measure_value = parseInt(await analyzeImage(image))
      console.log('Value', measure_value)
      const uploadResult = uploadImage(customer_code, image);
      if (!uploadResult) {
        return res.status(500).send({
          error_code: 'INVALID_DATA',
          error_description: 'Upload de imagem não foi feito'
        })
      } else {
        measure = {
          image_url: uploadResult,
          customer_code,
          measure_datetime,
          measure_type,
          measure_value,
          has_confirmed: 0
        }
        const data = await this.repository.update(id, measure);
        if (data[0] === 0) {
          res.status(404).send({
            error_code: 'MEASURE_NOT_FOUND',
            error_description: 'Measure not found'
          })
          return
        }
        res.status(200).send(data[1][0])
      }
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
          error_description: 'Dados invalidos'
        })
        return
      }
      let measure = await this.repository.getById(measure_uuid);
      if (!measure) {
        res.status(404).send({
          error_code: 'MEASURE_NOT_FOUND',
          error_description: 'Leitura não encontrada'
        })
        return
      }
      if (measure.has_confirmed == 1) {
        res.status(409).send({
          error_code: 'CONFIRMATION_DUPLICATE',
          error_description: 'Leitura do mês já realizada'
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
      let valid = validateUUID({ id: id });
      if (valid.error) {
        res.status(400).send({
          error_code: 'INVALID_ID',
          error_description: 'Id invalido'
        })
        return
      }
      const data = await this.repository.getById(id);
      if (data == null) {
        res.status(404).send({
          error_code: 'MEASURE_NOT_FOUND',
          error_description: 'Measure not found'
        })
        return
      }
      await this.repository.deleteById(id)
      res.status(200).send({
        message: 'Deleted'
      })
    } catch (erro) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição' + erro
      })
    }
  }
}