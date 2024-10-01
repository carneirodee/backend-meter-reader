import express, { Router } from 'express';
import MeasureConntroller from '../controllers/measure.controller'; // Assuming these functions are exported

const measureRouter: Router = express.Router();
const controller = new MeasureConntroller();

measureRouter.get('/measures', controller.get);

measureRouter.get('/measures/:id', controller.getById);

measureRouter.get('/:id/list', controller.getByCustomerCode)

measureRouter.post('/upload', controller.post);

measureRouter.put('/measures/:id', controller.put);

measureRouter.patch('/confirm', controller.patch);

measureRouter.delete('/measures/:id', controller.delete);

export default measureRouter;