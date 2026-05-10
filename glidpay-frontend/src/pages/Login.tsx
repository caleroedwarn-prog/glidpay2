import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../types/AuthUser";
import { loginUser } from "../api/auth";
import { type LoginRequest } from "../types/AuthUser";

function LoginPage(){

    const { login } = useAuth
    const navigate = useNavigate

    const [form, useForm] = useState<LoginRequest>({
        username: "",
        password: ""
    })

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () =>{
        setIsLoading(true)
        try{
            
        }
    }

}
export default LoginPage