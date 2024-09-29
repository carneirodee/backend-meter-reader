import express, { Router } from 'express';
import CustomerAddressConntroller from '../controllers/customer-address.controller'; // Assuming these functions are exported

const addressRouter: Router = express.Router();
const controller = new CustomerAddressConntroller();

addressRouter.get('/', controller.get);

addressRouter.get('/:id', controller.getById);

addressRouter.post('/', controller.post);


addressRouter.put('/:id', controller.put);

addressRouter.delete('/:id', controller.delete);

export default addressRouter;