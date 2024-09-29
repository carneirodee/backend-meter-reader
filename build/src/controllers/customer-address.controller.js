import CustomerAddressRepository from "../repositories/customer-address.repository";
export default class CustomerAddressConntroller {
    constructor() {
    }
    repository = new CustomerAddressRepository();
    get = async (req, res, next) => {
        try {
            var data = await this.repository.getAll();
            res.status(200).send(data);
        }
        catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    };
    getById = async (req, res, next) => {
        let id = req.params.id;
        try {
            var data = await this.repository.getById(id);
            res.status(200).send(data);
        }
        catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    };
    post = async (req, res, next) => {
        let id = req.params.id;
        try {
            var data = await this.repository.create(req.body);
            res.status(200).send(data);
        }
        catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    };
    put = async (req, res, next) => {
        let id = req.params.id;
        try {
            var data = await this.repository.update(id, req.body);
            res.status(200).send(data);
        }
        catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    };
    delete = async (req, res, next) => {
        let id = req.params.id;
        try {
            await this.repository.deleteById(id);
            res.status(200).send({
                message: 'Deleted'
            });
        }
        catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    };
}
