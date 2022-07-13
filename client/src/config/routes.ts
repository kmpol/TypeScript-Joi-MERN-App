import IRoute from '../interfaces/route';
import HomePage from '../pages/Home/Home';
import AuthPage from '../pages/Auth/Auth';

const routes: IRoute[] = [
    {
        path: '/',
        element: HomePage,
    },
    {
        path: '/auth',
        element: AuthPage,
    },
];

export default routes;
