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

 // Here I created a provider that will wrap the app and provide the context to all components that need it

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const[ user, setUser ] = useState<AuthUser | null>(null)
    const[ isLoggedIn, setIsLoggedIn ] = useState(false)
    
    const login = (user: AuthUser, token: string) => {
        setUser(user)
        setIsLoggedIn(true)
        localStorage.setItem("token", token)
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