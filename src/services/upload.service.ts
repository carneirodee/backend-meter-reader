import fs from 'fs'
import path from 'path';
import dotenv from 'dotenv';
const __dirname1 = path.resolve();
dotenv.config({ path: `${__dirname1}/src/envoriment.env` });

export const uploadImage = (id: String, imagesBase64: string) => {
    const date = Date.now()
    const url = `http://${process.env.LOCALHOST}:${process.env.PORT}/uploads/measures/${id}${date}.png`;
    fs.writeFile(`${__dirname1}/uploads/measures/${id}${date}.png`, imagesBase64, 'base64', (err) => {
        if (err) {
            console.error(err);
            return false; // Internal Server Error
        }

        // Read the written file
        fs.readFile(`${__dirname1}/uploads/measures/${id}${date}.png`, (err, data) => {
            if (err) {
                console.log(err);
                return false
            }
        });
    });
    return url;

}

export const uploadProfilePicture = (id: String, imagesBase64: string) => {
    const url = `http://${process.env.LOCALHOST}:${process.env.PORT}/uploads/profile_pictures/${id}.png`;
    fs.writeFile(`${__dirname1}/uploads/profile_pictures/${id}.png`, imagesBase64, 'base64', (err) => {
        if (err) {
            console.error(err);
            return false; // Internal Server Error
        }

        // Read the written file
        fs.readFile(`${__dirname1}/uploads/profile_pictures/${id}.png`, (err, data) => {
            if (err) {
                console.log(err);
                return false
            }
        });
    });
    return url;

}