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
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (token) {  // Only fetch the user if the token exists
          const fetchUser = async () => {
            try {
              const userData = await getUser(token);  // await the user data
              setUser(userData);  // Set the user data in state
            } catch (error) {
              console.error("Failed to fetch user:", error);
            }
          };
          
          fetchUser();  // Call the async function
        }

      }, [token]);  // Only run when token changestoken

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);