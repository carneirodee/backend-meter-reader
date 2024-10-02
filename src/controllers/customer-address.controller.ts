import CustomerAddressRepository from "../repositories/customer-address.repository";
import { validateUUID } from "../validators/validations";


export default class CustomerAddressController {
  constructor() {
  }
  repository = new CustomerAddressRepository();

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
      
      const data = await this.repository.getById(id);
      if (data === null) {
        res.status(404).send({
          error_code: 'CUSTOMER_ADDRESS_NOT_FOUND',
          error_description: 'Customer Address not found'
        })
      }
      res.status(200).send(data)
    } catch (erro) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  }

  post = async (req: any, res: any, next: any) => {
    let id = req.params.id
    try {
      const data = await this.repository.create(req.body)
      res.status(200).send(data)
    } catch (erro) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  }

  put = async (req: any, res: any, next: any) => {
    let id = req.params.id
    try {
      const data = await this.repository.update(id, req.body);
      if (data[0] === 0) {
        res.status(404).send({
          error_code: 'CUSTOMER_ADDRESS_NOT_FOUND',
          error_description: 'Customer Address not found'
        })
        return
      }
      res.status(200).send(data[1][0])
    } catch (erro) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  }

  delete = async (req: any, res: any, next: any) => {
    let id = req.params.id
    try {
      const data = await this.repository.getById(id);
      if (data == null) {
        res.status(404).send({
          error_code: 'CUSTOMER_ADDRESS_NOT_FOUND',
          error_description: 'Customer Address not found'
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