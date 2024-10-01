import express from 'express';
import swaggerUi from 'swagger-ui-express';
import InitDB from './connection';
import dotenv from 'dotenv'
import path from 'path';
import customerRouter from './routes/customer.routes';
import addressRouter from './routes/customer-address.routes';
import measureRouter from './routes/measure.routes';
import swaggerDocs from './swagger.json'
dotenv.config()

const __dirname1 = path.resolve();

const app = express();

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/uploads/measures', express.static(path.join(__dirname1, '/uploads/measures')));
app.use('/uploads/profile_pictures', express.static(path.join(__dirname1, '/uploads/profile_pictures')));
app.use('/customers', customerRouter);
app.use('/addresses', addressRouter);
app.use('/', measureRouter)
app.use('/measures', measureRouter)

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