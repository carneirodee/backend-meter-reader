import express from 'express';
import InitDB from './connection';
import dotenv from 'dotenv';
import path from 'path';
import customerRouter from './routes/customer.routes';
import addressRouter from './routes/customer-address.routes';
import measureRouter from './routes/measure.routes';
dotenv.config();
const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/customer', customerRouter);
app.use('/address', addressRouter);
app.use('/', measureRouter);
try {
    await InitDB();
}
catch (e) {
    console.log(e);
}
app.get("/", (request, response) => {
    response.status(200).send({ message: "success" });
});
export default app;
