import express from 'express';
import InitDB from './connection';
import dotenv from 'dotenv'
import path from 'path';
dotenv.config()

const __dirname = path.resolve();

const app = express();

app.use(express.json());


try {
   await InitDB()
} catch (e) {
    console.log(e)
}

app.get("/", (request: any, response: any) => {
    response.status(200).send({message: "success"});
});

export default app;