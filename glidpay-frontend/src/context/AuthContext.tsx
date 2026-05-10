import { createContext, useState} from "react";
import { type AuthUser } from "../types/AuthUser";

// Define what the context holds.... For the login system

type AuthContextUser = {
    user: AuthUser | null,
    isLoggedIn: boolean,
    login: (user: AuthUser, token:string) => void,
    logout: () => void
}

// I created a global box context box
 const AuthContext = createContext<AuthContextUser | null>(null)

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const[ user, setUser ] = useState<AuthUser | null>(null)
    const[ isLoggedIn, setIsLoggedIn ] = useState(false)
    
    const login = (user: AuthUser) => {
        setUser(user)
        setIsLoggedIn(true)
        localStorage.removeItem("token")
    }

    const logout = () =>{
        setUser(null)
        setIsLoggedIn(false)
        localStorage.removeItem("token")
    }

    return(
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext