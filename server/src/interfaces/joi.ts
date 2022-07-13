import mongoose from 'mongoose';

export interface IJoiCreateUser {
    email: string;
    username: string;
    password: string;
    repeatPassword: string;
}

export interface IJoiLoginUser {
    username: string;
    password: string;
}

export interface IJoiCreateBlog {
    title: string;
    author: mongoose.Schema.Types.ObjectId;
    content: string;
    headline: string;
    picture?: string;
}
