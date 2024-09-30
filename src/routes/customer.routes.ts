import express, { Router } from 'express';
import CustomerConntroller from '../controllers/customer.controller'; // Assuming these functions are exported
import router from './measure.routes';

const customerRouter: Router = express.Router();
const controller = new CustomerConntroller();

customerRouter.get('/', controller.get);

customerRouter.get('/:id', controller.getById);

customerRouter.get('/address/:id', controller.getAddressByCustomer);

customerRouter.post('/', controller.post);

customerRouter.post('/authenticate', controller.authenticate);

customerRouter.put('/:id', controller.put);

customerRouter.delete('/:id', controller.delete);

export default customerRouter;