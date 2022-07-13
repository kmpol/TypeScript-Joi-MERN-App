export enum ActionType {
    LOGIN = 'login',
    LOGOUT = 'logout',
}
export interface IUserState {
    username: string;
    token: string;
}

export interface ILoginAction {
    type: ActionType.LOGIN;
    payload: IUserState;
}
export interface ILogoutAction {
    type: ActionType.LOGOUT;
}

export type Action = ILoginAction | ILogoutAction;
