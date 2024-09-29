import fs from 'fs'
import path from 'path';
import dotenv from 'dotenv';
const __dirname1 = path.resolve();
dotenv.config({ path: `${__dirname1}/src/.env` });

const url = `http://${process.env.LOCALHOST}:${process.env.PORT}/uploads/out.png`;
export const uploadImage = (imagesBase64: string) => {
    fs.writeFile(`${__dirname1}/uploads/out.png`, imagesBase64, 'base64', (err) => {
        if (err) {
            console.error(err);
            return false; // Internal Server Error
        }

        // Read the written file
        fs.readFile(`${__dirname1}/uploads/out.png`, (err, data) => {
            if (err) {
                console.log(err);
                return false
            }
        });
    });
    return url;

}