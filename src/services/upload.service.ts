import fs from 'fs'
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
const url = `http://${process.env.MYSQL_HOST}:${process.env.PORT}/uploads/out.png`;
const __dirname = path.resolve();

export const uploadImage = (imagesBase64: string) => {
    fs.writeFile(`${__dirname}/uploads/out.png`, imagesBase64, 'base64', (err) => {
        if (err) {
            console.error(err);
            return false; // Internal Server Error
        }

        // Read the written file
        fs.readFile(`${__dirname}/uploads/out.png`, (err, data) => {
            if (err) {
                console.log(err);
                return false
            }
        });
    });
    return url;

}