import { Dispatch } from 'redux';
import { Action, ActionType, IUserState } from '../types/user.state';

export const login =
    (userState: IUserState) => (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.LOGIN,
            payload: userState,
        });
    };

export const logout = () => (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.LOGOUT,
    });
};

export * as actions from './userActions';
