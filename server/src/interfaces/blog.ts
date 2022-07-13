import { Document, Model } from 'mongoose';
import { IUser } from './user';

export interface IBlog {
    title: string;
    author: IUser;
    content: string;
    headline: string;
    picture?: string;
}

export interface IBlogDocument extends IBlog, Document {}
export interface IBlogModel extends Model<IBlogDocument> {}
