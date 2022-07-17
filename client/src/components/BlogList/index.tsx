import React from 'react';
import IBlog from '../../interfaces/blog';
import IUser from '../../interfaces/user';
import BlogCard from './BlogCard';
import { Container } from './styles';

export interface IBlogListProps {
    blogs: IBlog[];
}
const BlogList: React.FC<IBlogListProps> = (props) => {
    const { blogs } = props;
    return (
        <Container>
            {blogs.map((blog, index) => (
                <BlogCard
                    _id={blog._id}
                    author={(blog.author as IUser).username}
                    headline={blog.headline}
                    title={blog.title}
                    key={index}
                    createdAt={blog.createdAt}
                    updatedAt={blog.updatedAt}
                />
            ))}
        </Container>
    );
};

export default BlogList;
