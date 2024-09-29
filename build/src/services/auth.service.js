import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
const SALT_KEY = process.env.SALT_KEY;
export const generateToken = async (data) => {
    return jwt.sign(data, SALT_KEY, { expiresIn: '1d' });
};
export const decodeToken = async (token) => {
    const data = await jwt.verify(token, SALT_KEY);
    return data;
};
export const authorize = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    }
    else {
        jwt.verify(token, SALT_KEY, (error, decoded) => {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            }
            else {
                next();
            }
        });
    }
};
