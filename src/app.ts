import express from 'express';
import InitDB from './connection';
import dotenv from 'dotenv'
import path from 'path';
import customerRouter from './routes/customer.routes';
import addressRouter from './routes/customer-address.routes';
import measureRouter from './routes/measure.routes';
dotenv.config()

const __dirname1 = path.resolve();

const app = express();

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname1, '/uploads')));
app.use('/customer', customerRouter);
app.use('/address', addressRouter);
app.use('/', measureRouter)

async function Initialization(): Promise<void> {
    try {
        await InitDB()
    } catch (e) {
        console.log(e)
    }
}

Initialization();

app.get("/", (request: any, response: any) => {
    response.status(200).send({ message: "success" });
});

export default app;