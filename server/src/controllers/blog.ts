import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { IBlogDocument } from '../interfaces/blog';
import { IJoiCreateBlog } from '../interfaces/joi';
import Blog from '../models/blog';

export const createBlog = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const author: mongoose.Schema.Types.ObjectId = res.locals.user._id;
        const { title, headline, content, picture } =
            req.body as IJoiCreateBlog;
        const blog: IBlogDocument = new Blog({
            title,
            headline,
            content,
            picture,
            author,
        });
        await blog.save();
        res.status(200).send(blog);
    } catch (e: any) {
        res.status(400).send(e.message);
    }
};

export const getBlogs = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const blogs = await Blog.find({}).populate('author');
        if (blogs) {
            res.status(200).send(blogs);
        } else {
            res.status(404).send({ error: 'blogs not found' });
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
};

export const getBlogById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author');
        if (!blog) {
            return res.status(404).send({ message: 'Blog not found' });
        }

        res.status(200).send(blog);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
};
