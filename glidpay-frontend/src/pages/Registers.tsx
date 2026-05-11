import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { type RegisterRequest } from "../types/AuthUser";
import { registerUser } from "../api/auth";

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
        <>
        <form onSubmit={handleSubmit}>

            <input
            type="fullname"
            placeholder="full Name"
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            /><br /><br />

            <input
            type="username"
            placeholder="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            /><br /><br />

            <input
            type="country"
            placeholder="country"
            name="country"
            value={form.country}
            onChange={handleChange}
            /><br /><br />

            <input
            type="phone"
            placeholder="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            /><br /><br />

            <input
            type="email"
            placeholder="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            /><br /><br />

            <input
            type="password"
            placeholder="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            /><br /><br />

            <input
            type="confirm_password"
            placeholder="confirm password"
            name="confirm_password"
            value={form.confirm_password}
            onChange={handleChange}
            /><br /><br />

            <button type="submit">Register</button>
            {error && <p>{error}</p>}
            <p>{isLoading}</p>
        </form>
        </>
    )
}
export default RegisterPage;