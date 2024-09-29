import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { SALT_KEY } from '../config'

dotenv.config();


export const generateToken = async (data: string | object | Buffer) => {
    return jwt.sign(data, SALT_KEY as string, { expiresIn: '1d' });
};

export const decodeToken = async (token: string) => {
    const data = await jwt.verify(token, SALT_KEY as string);
    return data;
};

export const authorize = (req: any, res: any, next: any) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'

        });
    } else {
        jwt.verify(token, SALT_KEY as string, (error: any, decoded: any) => {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                next();
            }
        });
    }
};