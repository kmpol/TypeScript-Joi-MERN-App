import { Document, Model } from 'mongoose';

export interface IUser {
    email: string;
    username: string;
    password: string;
    tokens: {
        token: any;
    }[];
}

export interface IUserDocument extends IUser, Document {
    generateAuthToken: () => Promise<any>;
}

export interface IUserModel extends Model<IUserDocument> {
    findByCredentials: (
        username: string,
        password: string
    ) => Promise<IUserDocument>;

    isEmailTaken: (email: string) => Promise<boolean>;
}
