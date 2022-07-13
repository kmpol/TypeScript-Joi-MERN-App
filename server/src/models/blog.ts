import mongoose, { Schema } from 'mongoose';
import { IBlogDocument, IBlogModel } from '../interfaces/blog';

const BlogSchema: Schema<IBlogDocument> = new Schema(
    {
        title: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String },
        headline: { type: String },
        picture: { type: String },
    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.model<IBlogDocument, IBlogModel>('Blog', BlogSchema);

export default Blog;
