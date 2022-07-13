import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';
import {
    IJoiCreateBlog,
    IJoiCreateUser,
    IJoiLoginUser,
} from '../interfaces/joi';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (e) {
            return res.status(422).send({ e });
        }
    };
};

export const JoiUserSchemas = {
    createUser: Joi.object<IJoiCreateUser>({
        email: Joi.string().email().required(),
        username: Joi.string().min(3).max(20).required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
        repeatPassword: Joi.string().equal(Joi.ref('password')).required(),
    }),
    loginUser: Joi.object<IJoiLoginUser>({
        username: Joi.string().min(3).max(20).required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
    }),
};

export const JoiBlogSchemas = {
    createBlog: Joi.object<IJoiCreateBlog>({
        title: Joi.string().required(),
        // I don't need author required because auth middleware has already provided me the user/author
        author: Joi.string(),
        content: Joi.string(),
        headline: Joi.string(),
        picture: Joi.string(),
    }),
};
