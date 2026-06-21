import { type WithdrawRequest } from "../types/wallet";
import { withdraw } from "../api/wallet";
import { useState } from "react";
import { IoReturnUpBack } from "react-icons/io5";

const WithdrawPage = () => {

// Method    
const [selectedMethod, setSelectedMethod] = useState<string>("")

// Global
const [amount, setAmount ] = useState<number>(0)
const [pin, setPin] = useState<string>("")

// Credit Card
const [cardNumber, setCardNumber] = useState<string>("")
const [expiry, setExpiry] = useState<string>("")
const [cvv, setCvv] = useState<string>("")

//Momo / Orange money
const [phoneNumber, setPhoneNumber] = useState<string>("")

// UI states
const [error, setError] = useState<string>("")
const [success, setSuccess] = useState<string>("")
const [isLoading, setIsLoading] = useState<boolean>(false)

// Validate card number (luhn Algorithm)
const isValidCardNumber = (number: string): boolean => {
    const cleaned = number.replace(/\s/g, "")
    if(!/^\d{13,19}$/.test(cleaned)) return false

    let sum = 0
    let shouldDouble = false
    let i
    let digit

    for(i = cleaned.length - 1; i >=0; i--){
        digit = parseInt(cleaned[i])
        if(shouldDouble){
            digit *=2 
            if(digit > 9) digit -= 9
        }
        sum += digit
        shouldDouble = !shouldDouble
    }
    return sum % 10 === 0

}

// Validate Expiry date (MM/YY format + not expired )
const isValidExpiry = (value: string): boolean => {
    const match = value.match(/^(\d{2})\/(\d{2})$/)
    if (!match) return false
    
    const month = parseInt(match[1])
    const year = parseInt(match[2]) + 2000

    if(month < 1 || month > 12) return false

    const now = new Date()
    const expiryDate = new Date(year, month)

    return expiryDate > now
}

// validate CVV

const isvalidCVV = (value: string): boolean => {
    return /^\d{3,4}$/.test(value)
}

// validate phone number (MoMo/Orange)
const isValidPhoneNumber = (value: string): boolean => {
    return /^6\d{8}$/.test(value)
}

const handleSubmit  = async() =>{
    setError("")
    setSuccess("")

    if(amount <= 0){
        setError("Enter valid amount")
        return
    }

    if(pin.length !== 6){
        setError("PIN must be exactly 6 digits")
        return
    }
    // Method specific Validation
    if(selectedMethod === "Card"){

        if(!isValidCardNumber(cardNumber)){
            setError("Enter a valid card number")
            return
        }

        if(!isValidExpiry(expiry)){
            setError("Enter valid expiry date")
            return 
        }

        if(!isvalidCVV(cvv)){
            setError("Enter valid cvv")
        }
    }
        if(selectedMethod === "momo" || selectedMethod === "orange"){
            if(!isValidPhoneNumber(phoneNumber)){
                setError("Enter valid Phone number")
                return
            }
        }

    
    setIsLoading(true)

    try{
        const body: WithdrawRequest = {
            amount,
            pin,
            method: selectedMethod,
            ...(selectedMethod === "card" && {cardNumber, expiry, cvv}),
            ...(selectedMethod === "momo" && {phoneNumber, provider: "MTN"}),
            ...(selectedMethod === "orange" && {phoneNumber, provider: "Orange"})
        }
        const response = await withdraw(body)
        setSuccess(response.message)
    }catch {
        setError("withdrawal failed, check details and try again")
    }finally{
        setIsLoading(false)
    }
}

    return (
        <>
        <div className="withdrawal_dashboard_page">
            <div className="withdrawal_header">
                <h2>Withdraw Funds</h2>
                <a href="/dashboard"><IoReturnUpBack size={24} /> Back to Dashboard</a>
                <span className="withdrawal_subtitle">Choose your withdrawal method and enter the details below.</span>
            </div>
        </div>
        </>
    )

}