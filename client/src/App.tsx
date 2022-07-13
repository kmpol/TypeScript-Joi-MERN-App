import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './config/routes';

export interface IAppProps {}
const App: React.FC<IAppProps> = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route, index) => {
                    return (
                        <Route
                            path={route.path}
                            element={<route.element />}
                            key={index}
                        />
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
