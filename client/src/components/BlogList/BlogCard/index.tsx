import React from 'react';
import { Author, Container, Headline, Title } from './styles';

export interface IBlogCardProps {
    _id: string;
    title: string;
    headline: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}
const BlogCard: React.FC<IBlogCardProps> = (props) => {
    const { _id, title, headline, author, createdAt, updatedAt } = props;
    return (
        <Container>
            <Title>{title}</Title>
            <Headline>{headline}</Headline>
            <Author>
                by {author} at {createdAt}
            </Author>
        </Container>
    );
};

export default BlogCard;
