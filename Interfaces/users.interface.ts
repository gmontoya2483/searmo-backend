export interface IUsersRegister  {
    name: string;
    lastName: string;
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

export interface IDeleteUser {
    isDeleted: boolean;
}

export interface IAdminUser {
    isAdmin: boolean;
}

export interface IUpdateUser {
    email: string;
    name: string;
    lastName: string;
}
