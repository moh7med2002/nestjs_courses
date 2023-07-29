import * as jwt from 'jsonwebtoken';

export const createToken = (userId: number,role:string) => {
    return jwt.sign({ userId,role }, 'token');
};