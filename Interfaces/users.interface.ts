export interface IUsersRegister  {
    name: string;
    last_name: string;
    password: string;
    email: string;
}

export interface IAuthenticateUser {
    email: string;
    password: string;
}

export interface IValidateUser {
    isValidated: boolean;
}

export interface IActiveUser {
    isActive: boolean;
}
