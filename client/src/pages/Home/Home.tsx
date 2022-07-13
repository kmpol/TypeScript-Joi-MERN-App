import React from 'react';
import Navbar from '../../components/Navbar';

export interface IHomePageProps {}
const HomePage: React.FC<IHomePageProps> = (props) => {
    return (
        <div>
            <Navbar />
        </div>
    );
};

export default HomePage;
