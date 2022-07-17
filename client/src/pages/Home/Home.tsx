import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import BlogList from '../../components/BlogList/index';
import IBlog from '../../interfaces/blog';

export interface IHomePageProps {}
const HomePage: React.FC<IHomePageProps> = (props) => {
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setLoading(true);
        fetchAllBlogs();
    }, []);

    const fetchAllBlogs = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${process.env.REACT_APP_BACKEND_URL}/api/blogs`,
            });
            setBlogs(response.data as IBlog[]);
        } catch (e: any) {
            setError(e.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <BlogList blogs={blogs} />
        </div>
    );
};

export default HomePage;
