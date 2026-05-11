import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { loginUser } from "../api/auth";
import { type LoginRequest } from "../types/AuthUser";
import "../style/Login.css"

function LoginPage(){

    const { login } = useAuth()
    const navigate = useNavigate()

    const [form, setForm] = useState<LoginRequest>({
        username: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () =>{
        setIsLoading(true)
        try{
            const response = await loginUser(form)
            login(response.user, response.token)
            navigate("/dashboard")
        }catch{
            setError("invalid Username or Password")
        }finally{
            setIsLoading(false)
        }
    }
    return(
        <>
        <div className="Login_form">
            <h2>Login</h2>
            <pre>Welcome back...</pre>
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder="Username"
            name="username"
            value={form.username}
            onChange={handleChange} /><br /><br />

            <input 
            type="password"
            placeholder="password"
            name="password"
            value={form.password}
            onChange={handleChange} /><br /><br />

            <button 
            type="submit"
            disabled={isLoading}
            >Login </button>

            {error && <p>{error}</p>} 
            </form>
        </div>
        </>
    )

}
export default LoginPage