import { type WithdrawRequest } from "../types/wallet";
import { withdraw } from "../api/wallet";
import { useState } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";



 const WithdrawPage = () => {

    const navigate = useNavigate();

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
                <button title="Back to Dashboard" onClick={() => navigate("/dashboard")}>
                    <IoReturnUpBack size={24} />
                </button>
                <h2>Withdraw Funds</h2>
                <span className="withdrawal_subtitle">Choose your withdrawal method below and enter your corresponding transaction details to proceed with the withdrawal.</span>
            </div>
        </div>

        <div className="Withdrawal_Method-container">
            <div className="withdrawal_method-selection">
                <button className="withdrawal_method-btn" onClick={() => setSelectedMethod("card")}>
                    Card
                </button>
                <button className="withdrawal_method-btn" onClick={() => setSelectedMethod("momo")}>
                    Momo
                </button>
                <button className="withdrawal_method-btn" onClick={() => setSelectedMethod("orange")}>
                    Orange Money
                </button>
            </div>
        </div>
        {selectedMethod && (
            <div className="modal-overlay">
                <div className="modal-box">
                    <button type="button" title="btn" className="modal-close-btn" 
                    onClick={() => setSelectedMethod("")}>
                        <FaTimes size={20} />
                    </button>

                    <h3>
                        {selectedMethod === "card" && "Card Withdrawal"}
                        {selectedMethod === "momo" && "Momo Withdrawal"}
                        {selectedMethod === "orange" && "Orange Money Withdrawal"}
                    </h3>

                    {/* Shared Amount Input */}
                    <div className="General_Form-input">
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                        />
                    </div>

                    {/* Card Inputs */}
                    {selectedMethod === "card" && (
                    <div className="Card_selectecMethod-input">
                            <label htmlFor="cardNumber">Card Number</label>
                            <input 
                            type="text"
                            placeholder="Card Number"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)} 
                            />

                            <label htmlFor="expiry">Expiry Date</label>
                            <input
                            type="text"
                            placeholder="MM/YY"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            />

                            <label htmlFor="cvv">CVV</label>
                            <input 
                            type="text"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            />
                        </div>
                        )}

                    {/* Mobile money input */}
                    {selectedMethod === "momo" && (
                        <div className="MobileMoney_selectedMethod-input">
                            <label htmlFor="MobileMoney">Mobile Money (MoMO)</label>
                            <input 
                            type="text"
                            placeholder="Enter Phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    )}

                    {/*Orange Money*/}
                    {selectedMethod === "orange" && (
                        <div className="OrangeMoney_selectedMethod-input">
                            <label htmlFor="OrangeMoney">Orange Money</label>
                            <input
                            type="text"
                            placeholder="Enter phone number"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    )}
                    
                    {/*shared Pin input*/}
                    <div className="Shared_pin-input">
                        <label htmlFor="pin">Enter your 6-Digit PIN</label>
                        <input
                        type="password"
                        maxLength={6}
                        placeholder="******"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        />
                        {error && <span className="error-message">{error}</span>}
                        {success && <span className="success-message">{success}</span>}
                    </div>

                    <div className="Submit_Withdrawal">
                        <button
                        className="Submit-btn"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        >
                            {isLoading ?
                            <div className="Loading-btn">loading...</div> : <div className="Submit-btn-text">Withdraw</div>}
                        </button>
                    </div>
                </div>
            </div>

        )}

        </>
    )

}
export default WithdrawPage