import { type LoginRequest, type LoginResponse, type RegisterRequest, type RegisterResponse } from "../types/AuthUser";

const BASE_URL = "https://localhost:8000"

export const loginUser = async(form: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${BASE_URL}/Auth/login`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(form)
    })
    if(!response.ok){
        throw new Error("Invalid username or Password")
    }
    const data = response.json()
    return (data)
}

export const registerUser = async(form: RegisterRequest): Promise<RegisterResponse> => {
    const response = await fetch(`${BASE_URL}/Auth/register`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(form)
    })
    if(!response.ok){
        throw new Error("Registration failed")
    }
    const data = response.json()
    return (data)
}