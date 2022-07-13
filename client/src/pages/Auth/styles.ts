import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
export const Container = styled.div`
    padding: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const LoginContainer = styled.div`
    background-color: #ececec;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
`;

export const LoginText = styled.p`
    margin: 24px 0;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const InputForm = styled.input`
    padding: 6px 12px;
    margin: 10px 0;
    border-radius: 3px;
    border: none;
`;

export const Button = styled.button`
    background-color: #59b63c;
    border: none;
    padding: 10px 24px;
    width: 100%;
    margin-bottom: 24px;
    cursor: pointer;
    border-radius: 3px;
    color: black;
    &:hover {
        background-color: #48a52b;
    }
    &:disabled {
        cursor: not-allowed;
        background-color: gray;
    }
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    font-size: 14px;
    margin: 20px 0 0 33px;
    width: 100%;
    &:hover {
        color: #726e6e;
    }
`;

export const ToggleAuth = styled.p`
    font-size: 12px;
    padding: 0;
    cursor: pointer;
`;
