import CustomerAddressRepository from "../repositories/customer-address.repository";
import CustomerRepository from "../repositories/customer.repository";
import { generateToken } from "../services/auth.service";
import { validateCode } from "../validators/validations";
import { v4 as uuidv4 } from 'uuid';

export default class CustomerConntroller {
    constructor() {
    }
    repository = new CustomerRepository();
    repositoryAddress = new CustomerAddressRepository();


    get = async (req: any, res: any, next: any) => {
        try {
            const data = await this.repository.getAll()
            res.status(200).send(data)
        } catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição' + erro
            })
        }
    }

    getById = async (req: any, res: any, next: any) => {
        let id = req.params.id
        try {
            const data = await this.repository.getById(id)
            if (data !== null) {
                res.status(200).send(data)
            } else {
                res.status(404).send({
                    error_code: 'NOT_FOUND',
                    error_description: 'Cliente não encontrado'
                })
            }
        } catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição' + erro
            })
        }
    }

    getAddressByCustomer = async (req: any, res: any, next: any) => {
        let id = req.params.id
        try {
            const data = await this.repository.getAddressByCustomerCode(id)
            if (data !== null) {
                res.status(200).send(data)
            } else {
                res.status(404).send({
                    error_code: 'NOT_FOUND',
                    error_description: 'Cliente não encontrado'
                })
            }
        } catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição' + erro
            })
        }
    }

    post = async (req: any, res: any, next: any) => {
        let id = req.params.id;
        try {
            req.body.customer_code = uuidv4();
            req.body.is_active = 1;
            if (validateCode(req.body.code)) {
                const data = await this.repository.create(req.body);
                const address = {
                    address: req.body.address || null,
                    city: req.body.city || null,
                    district: req.body.district || null,
                    country: req.body.country || null,
                    state: req.body.state || null,
                    postal_code: req.body.postal_code || null,
                    phone: req.body.phone || null,
                    customer_code: data.customer_code
                }
                const data_address = await this.repositoryAddress.create(address);
                res.status(200).send({ success: true, data, address: data_address })

            } else {
                res.status(400).send({
                    error_code: 'INVALID_CODE',
                    error_description: 'CPF Invalido'
                })
                return;
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
            const data = await this.repository.update(id, req.body)
            if (data !== null) {
                res.status(200).send({
                    success: true
                })
            } else {
                res.status(404).send({
                    error_code: 'NOT_FOUND',
                    error_description: 'Cliente não encontrado'
                })
            }
        } catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição'
            })
        }
    }

    delete = async (req: any, res: any, next: any) => {
        let id = req.params.id
        try {
            const data = await this.repository.deleteById(id)
            if (data !== null) {
                res.status(200).send({
                    message: 'Deleted'
                })
            } else {
                res.status(404).send({
                    error_code: 'NOT_FOUND',
                    error_description: 'Cliente não encontrado'
                })
            }
        } catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição' + erro
            })
        }
    }

    authenticate = async (req: any, res: any, next: any) => {
        try {
            const data = await this.repository.authenticate({
                email: req.body.email,
                password: req.body.password
            });
            if (!data) {
                res.status(404).send({
                    error_code: 'CUSTOMER NOT FOUND',
                    error_description: 'Customer not found'
                })
                return
            }

            const token = await generateToken({
                email: data.email,
                name: data.name
            })

            await this.repository.updateAccessToken(data.customer_code, token)

            res.status(200).send({
                token: token,
                data: {
                    email: data.email,
                    nome: data.name
                },
                message: 'Autenticação feita com sucesso'
            })
        } catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição'+erro
            })
        }
    }
}