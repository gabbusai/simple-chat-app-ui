import axios, { AxiosError } from "axios"
import { type LoginResponse, type UserType, type LoginFormType, type LoginResult, type RegisterFormType, type RegisterResult, type RegisterResponse, type RegisterError, type SearchUserType, type UserBioType } from "./types";

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
        //console.log('error')
        const axiosError = error as AxiosError<RegisterError>;
        //console.log('axiosError', axiosError.response?.data.message);
        return {
            success: false,
            error: axiosError.response?.data.message || "Unknown error",
        };
    }
}
//logout user
export const logoutUser = async (token: string | null): Promise<void> => {
    try {
        await axiosInstance.post('/api/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        console.error("Error logging out:", axiosError);

        if (axiosError.response) {
            throw axiosError.response.data;
        }

        throw error;
    }
};

//search users
export const searchUsers = async (token: string | null, search: string, perPage : number, curPage: number): Promise<SearchUserType> => {
    try{
        const response = await axiosInstance.get<SearchUserType>(`/api/users?search=${search}&per_page=${perPage}&page=${curPage}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        console.error("Error searching users:", axiosError);
        //console.log(axiosError.response?.data.message);
        if (axiosError.response) {
            throw axiosError.response.data?.message || "Unknown error";
        }

        throw error;
    }
}

//get user bio
export const getSelfBio = async (token: string | null): Promise<UserBioType> => {
    try {
        const response = await axiosInstance.get<UserBioType>(`/api/bio`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        console.error("Error fetching user bio:", axiosError);
        if (axiosError.response) {
            throw axiosError.response.data?.message || "Unknown error";
        }

        throw error;
    }
}
//get bio by id
export const getBioId = async (token: string | null, id: number | string | undefined): Promise<UserBioType> => {
    try {
        const response = await axiosInstance.get<UserBioType>(`/api/bio/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        console.error("Error fetching user bio:", axiosError);
        if (axiosError.response) {
            throw axiosError.response.data?.message || "Unknown error";
        }

        throw error;
    }
}

//const update bio
export const updateBio = async (token: string | null, bio: string): Promise<UserBioType> => {
    try {
        const response = await axiosInstance.put<UserBioType>(`/api/bio`, { bio }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        console.error("Error updating user bio:", axiosError);
        if (axiosError.response) {
            throw axiosError.response.data?.message || "Unknown error";
        }

        throw error;
    }
}