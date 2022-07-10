export interface IJoiCreateUser {
    email: string;
    username: string;
    password: string;
    repeatPassword: string;
}

export interface IJoiLoginUser {
    username: string;
    password: string;
}
