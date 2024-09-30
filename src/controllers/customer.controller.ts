import CustomerRepository from "../repositories/customer.repository";
import { generateToken } from "../services/auth.service";
import { validateCode } from "../validators/validations";
import { v4 as uuidv4 } from 'uuid';

export default class CustomerConntroller {
    constructor() {
    }
    repository = new CustomerRepository();

    get = async (req: any, res: any, next: any) => {
        try {
            var data = await this.repository.getAll()
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
            var data = await this.repository.getById(id)
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
        let id = req.params.id
        try {
            req.body.customer_code = uuidv4();
            req.body.is_active = 1;
            if (validateCode(req.body.code)) {
                var data = await this.repository.create(req.body)
            } else {
                res.status(400).send({
                    error_code: 'INVALID_CODE',
                    error_description: 'CPF Invalido'
                })
                return;
            }
            res.status(200).send({success: true})
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
            var data = await this.repository.deleteById(id)
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
            var data = await this.repository.authenticate({
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
                message: 'Falha ao processar sua requisição'
            })
        }
    }
}