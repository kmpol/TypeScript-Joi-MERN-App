import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosResponse } from 'axios';
import Navbar from '../../components/Navbar';
import {
    Button,
    Container,
    PageContainer,
    LoginContainer,
    LoginText,
    InputForm,
    Form,
    ToggleAuth,
} from './styles';
import { userActions } from '../../state/index';
import { IUserState } from '../../state/types/user.state';
import { useNavigate } from 'react-router-dom';
import { State } from '../../state/reducers';

export interface IAuthPageProps {}
const AuthPage: React.FC<IAuthPageProps> = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: State) => state.user);
    console.log(user);
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        repeatPassword: '',
    });

    useEffect(() => {
        if (user.username !== '') {
            navigate('/');
        }
    }, [user]);

    const dispatchLoginAction = (response: AxiosResponse<any, any>) => {
        const userState: IUserState = {
            token: response.data.token,
            username: response.data.user.username,
        };
        dispatch<any>(userActions.login(userState));
    };

    const onButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isLogin) {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:5000/api/users/login',
                data: {
                    username: formData.username,
                    password: formData.password,
                },
            });
            dispatchLoginAction(response);
        } else {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:5000/api/users',
                data: formData,
            });
            dispatchLoginAction(response);
        }
        navigate('/');
    };

    return (
        <PageContainer>
            <Navbar />
            <Container>
                <LoginContainer>
                    <LoginText>
                        {isLogin ? 'Welcome back!' : 'Signup!'}
                    </LoginText>
                    <Form>
                        {!isLogin && (
                            <InputForm
                                placeholder='email'
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                            />
                        )}
                        <InputForm
                            placeholder='username'
                            value={formData.username}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    username: e.target.value,
                                })
                            }
                        />
                        <InputForm
                            placeholder='password'
                            type={'password'}
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                        />
                        {!isLogin && (
                            <InputForm
                                placeholder='repeat password'
                                type={'password'}
                                value={formData.repeatPassword}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        repeatPassword: e.target.value,
                                    })
                                }
                            />
                        )}
                        <ToggleAuth
                            onClick={() => {
                                setIsLogin(!isLogin);
                            }}
                        >
                            {isLogin
                                ? "Don't have an account?"
                                : 'Already have an account? Login!'}
                        </ToggleAuth>
                        <Button
                            onClick={(e) => {
                                onButtonClick(e);
                            }}
                        >
                            Login!
                        </Button>
                    </Form>
                </LoginContainer>
            </Container>
        </PageContainer>
    );
};

export default AuthPage;
