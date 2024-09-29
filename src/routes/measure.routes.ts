import express, { Router } from 'express';
import MeasureConntroller from '../controllers/measure.controller'; // Assuming these functions are exported

const measureRouter: Router = express.Router();
const controller = new MeasureConntroller();

measureRouter.get('', controller.get);

measureRouter.get('/measure/:id', controller.getById);

measureRouter.get('/:id/list', controller.getByCustomerCode)

measureRouter.post('/upload', controller.post);

measureRouter.put('/:id', controller.put);

measureRouter.patch('/confirm', controller.patch);


measureRouter.delete(':id', controller.delete);

export default measureRouter;