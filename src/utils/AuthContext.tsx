import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { getUser } from './api';
import type { UserType } from './types';



type AuthContextType = {
    user: UserType | null;
    token: string | null;
    setUser: (user: UserType | null) => void;
    setToken: (token: string | null) => void;
}

type AuthProviderProps = {
  children: ReactNode;
};


export const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
})

function AuthContextProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<UserType | null>(null);
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem("authToken") // read from localStorage on init
    );

    useEffect(() => {
        if (token) {
            localStorage.setItem("authToken", token); // persist token
            const fetchUser = async () => {
                try {
                    const userData = await getUser(token);
                    setUser(userData);
                } catch (error) {
                    console.error("Failed to fetch user:", error);
                    setToken(null);
                    localStorage.removeItem("authToken"); // clear bad token
                }
            };
            fetchUser();
        } else {
            localStorage.removeItem("authToken"); // cleanup if logged out
            setUser(null);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);