import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { IJoiCreateUser, IJoiLoginUser } from '../interfaces/joi';
import { IUser, IUserDocument } from '../interfaces/user';
import User from '../models/user';

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, username, password } = req.body as IJoiCreateUser;
    const user: IUserDocument = new User({ email, username, password });

    try {
        await User.isEmailTaken(email);
        await user.save();
        const token = await user.generateAuthToken();

        res.status(201).send({
            user,
            token,
        });
    } catch (e: any) {
        res.status(400).send({ error: e.message });
    }
};

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { username, password } = req.body as IJoiLoginUser;
    try {
        const user: IUserDocument = await User.findByCredentials(
            username,
            password
        );
        const token = await user.generateAuthToken();
        res.status(200).send({
            user,
            token,
        });
    } catch (e: any) {
        res.status(401).send({ error: e.message });
    }
};

export const logoutUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user: IUserDocument = res.locals.user;
        const requestToken: string = res.locals.token;

        user.tokens = user.tokens?.filter((token) => {
            return requestToken !== token.token;
        });

        await user.save();
        res.status(200).send();
    } catch (e: any) {
        res.status(500).send(e.message);
    }
};

export const fetchUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        const token = res.locals.token;
        res.status(200).send({
            user,
            token,
        });
    } catch (e: any) {
        res.status(401).send(e.message);
    }
};
