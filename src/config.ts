import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT;
const GEMINI_API_KEY= process.env.GEMINI_API_KEY
const SALT_KEY = process.env.SALT_KEY

export  {
    port,
    GEMINI_API_KEY,
    SALT_KEY
}