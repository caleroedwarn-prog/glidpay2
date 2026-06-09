import { type WalletBalance,
         type DepositeRequest,
         type WithdrawRequest,
         type TransferRequest,
         type WalletResponse,
         type TransactionList
 } from "../types/wallet";

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

export const deposit = async(body: DepositeRequest): Promise<WalletResponse> => {
    const response = await fetch(`${BASE_URL}/wallet/deposit`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(body)

    })
    if(!response.ok) throw new Error("Failed to place Deposite try again later")
        return response.json()
}

export const withdraw = async(body: WithdrawRequest): Promise<WalletResponse> => {
    const response = await fetch(`${BASE_URL}/wallet/withdraw`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(body)
    })
    if(!response.ok) throw new Error("Failed to place Withdrawal, Try again later")
        return response.json()
}

export const transfer = async(body: TransferRequest): Promise<WalletResponse> => {
    const response = await fetch(`${BASE_URL}/wallet/transfer`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(body)
    })
    if(!response.ok) throw new Error("Failed to transfer, try again later")
        return response.json()
}

export const getTransaction = async(): Promise<TransactionList> => {
    const response = await fetch(`${BASE_URL}/wallet/transactions`, {
        method: "GET",
        headers: authHeaders()
    })
    if(!response.ok) throw new Error("Failed to fetch transactions")
        return response.json()
}