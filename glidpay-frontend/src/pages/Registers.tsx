import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { type RegisterRequest } from "../types/AuthUser";
import { registerUser } from "../api/auth";
import "../style/Register.css"              

function RegisterPage(){
    
    const navigate = useNavigate()

    const [form, setForm] = useState<RegisterRequest>({
        fullname: "",
        username: "",
        country: "",
        phone: "",
        email: "",
        password: "",
        confirm_password: ""
    })

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        try{
            const res = await registerUser(form)
            if(res){
                navigate("/login")
            }
        }catch{
            setError("Registration failed! try again next time")
        }finally{
            setIsLoading(false)
        }
    }

    return(
        <div className="RegisterPage">
            <div className="Register_image">
            <img src="/images/glidpay-logo.png" alt="login" width={600}/>
        </div>
            <div className="Register_form">
                <h1>Register</h1>
                <pre>Start moving Money the Smarter Way...</pre>
        <form onSubmit={handleSubmit}>

            <div className="Register_input">
            <input
            type="text"
            placeholder="full name"
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            />

            <input
            type="text"
            placeholder="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            />

            <input
            type="text"
            placeholder="country"
            name="country"
            value={form.country}
            onChange={handleChange}
            />

            <input
            type="tel"
            placeholder="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            />

            <input
            type="email"
            placeholder="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            />

            <input
            type="password"
            placeholder="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            />

            <input
            type="password"
            placeholder="confirm password"
            name="confirm_password"
            value={form.confirm_password}
            onChange={handleChange}
            />

            <button className="button" type="submit">Register</button>
            {error && <p>{error}</p>}
            <p>{isLoading}</p>
            </div>
        </form>
        </div>
        </div>
    )
}
export default RegisterPage;