import { type WalletBalance } from "../types/wallet";

const BASE_URL = "https://localhost:8000";
const getToken = localStorage.getItem("token");
const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken}`
})

export const getBalance = async (): Promise<WalletBalance> => {
    const response = await fetch(`${BASE_URL}/wallet/balance`, {
        method: "GET",
        headers: authHeaders()
    })
    if(!response.ok) throw new Error("Failed to fetch balance")
        return response.json()
}