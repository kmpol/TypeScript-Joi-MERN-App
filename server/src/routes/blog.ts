import express from 'express';

import { auth } from '../middleware/auth';
import { ValidateSchema, JoiBlogSchemas } from '../middleware/joi';
import { createBlog, getBlogs } from '../controllers/blog';

const router = express.Router();

router.post(
    '/blogs',
    [auth, ValidateSchema(JoiBlogSchemas.createBlog)],
    createBlog
);

router.get('/blogs', getBlogs);

export default router;
