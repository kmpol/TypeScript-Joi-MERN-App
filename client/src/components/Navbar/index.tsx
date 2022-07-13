import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { State } from '../../state/reducers';

import { login, logout } from '../../state/actions/userActions';
import { IUserState } from '../../state/types/user.state';

import { Container, StyledLink, Logout, Greetings } from './styles';

const Navbar = () => {
    const user = useSelector((state: State) => state.user);
    const dispatch = useDispatch();
    console.log(user);

    useEffect(() => {
        fetchTokenFromLocalStorage();
    }, []);

    const fetchTokenFromLocalStorage = async () => {
        const user: IUserState = JSON.parse(localStorage.getItem('user') || '');
        await axios({
            method: 'get',
            url: 'http://localhost:5000/api/users/me',
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        dispatch<any>(login(user));
    };

    const onLogoutClick = async () => {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:5000/api/users/logout',
            headers: { Authorization: `Bearer ${user.token}` },
        });
        dispatch<any>(logout());
    };

    return (
        <Container>
            <Greetings>
                {user.username ? `Hello, ${user.username}` : ''}
            </Greetings>
            <StyledLink to='/'>Home</StyledLink>
            {user.username === '' ? (
                <StyledLink to='/auth'>Login</StyledLink>
            ) : (
                <Logout onClick={onLogoutClick}>Logout</Logout>
            )}
        </Container>
    );
};

export default Navbar;
