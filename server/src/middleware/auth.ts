import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';

import User from '../models/user';

interface JwtPayloadWIthId extends JwtPayload {
    _id: string;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req
            .header('Authorization')
            ?.replace('Bearer ', '') as string;
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayloadWIthId;
        const user = await User.findOne({
            _id: decoded._id,
            'tokens.token': token,
        });
        console.log(user);

        if (!user) {
            throw new Error();
        }

        res.locals.token = token;
        res.locals.user = user;

        // req.token = token;
        // req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' });
    }
};
