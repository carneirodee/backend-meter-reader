import CustomerRepository from "../repositories/customer.repository";
import { generateToken } from "../services/auth.service";

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
                message: 'Falha ao processar sua requisição'
            })
        }
    }

    getById = async (req: any, res: any, next: any) => {
        let id = req.params.id
        try {
            var data = await this.repository.getById(id)
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
            var data = await this.repository.create(req.body)
            res.status(200).send(data)
        } catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição'+erro
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

            res.status(200).send(data)
        } catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição'
            })
        }
    }
}