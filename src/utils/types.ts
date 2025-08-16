export type UserType = {
    id: number;
    name: string;
    email: string;
}

export type LoginFormType = {
    email: string;
    password: string;
}

export type LoginResponse = {
    token: string;
    user: UserType;
}

export type LoginResult = | { success: true; data: LoginResponse } | { success: false; error: string };

//register stuff
export type RegisterFormType = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export type RegisterResponse = {

}
export type RegisterError = {
    message: string;
    errors:{
        name?: string[];
        email?: string[];
        password?: string[];
        password_confirmation?: string[];
    }
}

export type RegisterResult = | { success: true; data: RegisterResponse } | { success: false; error: string };