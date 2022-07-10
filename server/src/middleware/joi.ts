import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';
import { IJoiCreateUser, IJoiLoginUser } from '../interfaces/joi';

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

export const JoiSchemas = {
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
