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