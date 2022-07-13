import { Action, ActionType, IUserState } from '../types/user.state';

const initialState: IUserState = {
    username: '',
    token: '',
};

const reducer = (state: IUserState = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.LOGIN:
            localStorage.setItem('user', JSON.stringify(action.payload));
            return action.payload;
        case ActionType.LOGOUT:
            localStorage.removeItem('user');
            return initialState;
        default:
            return state;
    }
};

export default reducer;
