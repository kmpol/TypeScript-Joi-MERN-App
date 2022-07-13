import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 10vh;
`;

export const StyledLink = styled(Link)`
    margin-right: 5vw;
    text-decoration: none;
    font-weight: 300;
    color: black;
    font-size: 18px;

    &:hover {
        font-weight: 400;
    }
`;

export const Logout = styled.p`
    margin-right: 5vw;
    text-decoration: none;
    font-weight: 300;
    color: black;
    font-size: 18px;

    &:hover {
        font-weight: 400;
        cursor: pointer;
    }
`;

export const Greetings = styled.p`
    position: absolute;
    left: 5vw;
`;
