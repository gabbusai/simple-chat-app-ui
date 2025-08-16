import axios, { AxiosError } from "axios"
import { type LoginResponse, type UserType, type LoginFormType, type LoginResult, type RegisterFormType, type RegisterResult, type RegisterResponse, type RegisterError } from "./types";

const BASE_URL = "http://192.168.100.248:8080"

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    withCredentials: false, // If you need to send cookies or other credentials with requests
    timeout: 5000, // Optional: to set a timeout for requests
});

//get user details
export const getUser = async (token: string | null) => {
    try {
        const response = await axiosInstance.get<UserType>('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;  // Axios automatically returns data in `response.data`
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        console.error("Error fetching user data:", axiosError);

        if (axiosError.response) {
            throw axiosError.response.data;
        }

        throw error;
    }
};

//login user
export const loginUser = async (formData: LoginFormType): Promise<LoginResult> => {
    try {
        const response = await axiosInstance.post<LoginResponse>('/api/login', formData);
        return { success: true, data: response.data };
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        return {
        success: false,
        error: axiosError.response?.data.message || "Unknown error",
        };
    }
}

//register user
export const registerUser = async (formData: RegisterFormType): Promise<RegisterResult> => {
    try {
        const response = await axiosInstance.post<RegisterResponse>('/api/register', formData);
        return { success: true, data: response.data };
    } catch (error) {
        const axiosError = error as AxiosError<RegisterError>;
        return {
            success: false,
            error: axiosError.response?.data.message || "Unknown error",
        };
    }
}
