import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { loginUser } from "../api/auth";
import { type LoginRequest } from "../types/AuthUser";
import "../style/Login.css"
import { IoReturnDownBack } from "react-icons/io5";

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setIsLoading(true)
        try {
            /* --- ORIGINAL BACKEND INTEGRATION (COMMENTED OUT) ---
            const response = await loginUser(form)
            login(response.user, response.token)
            navigate("/dashboard")
            ----------------------------------------------------- */

            // FAKE AUTHENTICATION AND VALIDATION DETOUR
            if (!form.username || !form.password) {
                setError("Please fill in all fields");
                return;
            }

            // Simulated successful user setup for your context matching Dashboard usage
            const fakeUser = {
                fullname: form.username.charAt(0).toUpperCase() + form.username.slice(1),
                username: form.username
            };
            const fakeToken = "mock-jwt-token-xyz123";

            // Pass mock session payloads to hook state manager
            login(fakeUser, fakeToken);
            navigate("/dashboard");

        } catch {
            setError("invalid Username or Password")
        } finally {
            setIsLoading(false)
        }
    }
    return(

        <div className="LoginPage">
        <div className="Login_image">
            <img src="/images/glidpay-logo.png" alt="login" width={600}/>
        </div>
        <div className="Login_form">
            
            <IoReturnDownBack size={23} onClick={() => navigate("/")}/>
            <h2>Login</h2>
            <pre>Welcome back...</pre>
        <div className="Login_input">
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
            className="button"
            type="submit"
            disabled={isLoading}
            >Login </button>

            {error && <p>{error}</p>} 
            <br /><br />
            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
            </form>
        </div>
        </div>
        </div>
    )

}
export default LoginPage