import { type WithdrawRequest } from "../types/wallet";
import { withdraw } from "../api/wallet";
import React, { useState } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../style/withdraw.css";
import { FaTimes, FaCreditCard, FaMobileAlt, FaSpinner, FaExclamationCircle, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";



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

const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")

    value = value.substring(0, 16)

    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ")
    setCardNumber(formattedValue)

}
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
const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "") // Remove all non-digits
    
    if (value.length > 4) {
        value = value.slice(0, 4) // Limit to 4 digits (MMYY)
    }
    
    // Format as MM/YY
    if (value.length > 2) {
        value = value.slice(0, 2) + "/" + value.slice(2)
    }
    
    setExpiry(value)
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

const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")
    value = value.substring(0, 4)
    setCvv(value)
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
    if(selectedMethod === "card"){

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
            return
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
        
        // Clear form and close modal after 2 seconds on success
        setTimeout(() => {
            setSelectedMethod("")
            setAmount(0)
            setPin("")
            setCardNumber("")
            setExpiry("")
            setCvv("")
            setPhoneNumber("")
            setSuccess("")
        }, 2500)
    }catch {
        setError("Withdrawal failed, check details and try again")
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
                <button className="withdrawal_method-btn" onClick={() => setSelectedMethod("card")} title="Withdraw with Card">
                    <FaCreditCard size={24} />
                    Card
                </button>
                <button className="withdrawal_method-btn" onClick={() => setSelectedMethod("momo")} title="Withdraw with Mobile Money">
                    <FaMobileAlt size={24} />
                    Momo
                </button>
                <button className="withdrawal_method-btn" onClick={() => setSelectedMethod("orange")} title="Withdraw with Orange Money">
                    <FaMoneyBillWave size={24} />
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

                    {/* Card Preview Section */}
                    {selectedMethod === "card" && (
                        <div className="card-preview-section">
                            <div className="card-preview">
                                <div className="card-preview-chip">
                                    <div className="chip-pattern"></div>
                                </div>
                                <div className="card-preview-logo">
                                    <span>VISA</span>
                                </div>
                                <div className="card-preview-number">
                                    {cardNumber ? (
                                        cardNumber.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').substring(0, 19)
                                    ) : (
                                        '•••• •••• •••• ••••'
                                    )}
                                </div>
                                <div className="card-preview-details">
                                    <div className="cardholder">
                                        <span className="label">Card Holder</span>
                                        <span className="value">YOUR NAME</span>
                                    </div>
                                    <div className="card-expiry">
                                        <span className="label">Expires</span>
                                        <span className="value">{expiry || 'MM/YY'}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="card-preview-hint">👆 Add your card details below</p>
                        </div>
                    )}

                    {/* Card Inputs */}
                    {selectedMethod === "card" && (
                    <div className="Card_selectecMethod-input">
                            <label htmlFor="cardNumber">Card Number</label>
                            <input 
                            type="text"
                            placeholder="Card Number"
                            value={cardNumber}
                            onChange={handleCardNumberChange} 
                            />

                            <label htmlFor="expiry">Expiry Date</label>
                            <input
                            type="text"
                            placeholder="MM/YY"
                            value={expiry}
                            onChange={handleExpiryChange}
                            />

                            <label htmlFor="cvv">CVV</label>
                            <input 
                            type="text"
                            placeholder="123"
                            value={cvv}
                            onChange={handleCvvChange}
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
                        {error && (
                            <span className="error-message">
                                <FaExclamationCircle size={18} />
                                {error}
                            </span>
                        )}
                        {success && (
                            <span className="success-message">
                                <FaCheckCircle size={18} />
                                {success}
                            </span>
                        )}
                    </div>

                    <div className="Submit_Withdrawal">
                        <button
                        className="Submit-btn"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        title={isLoading ? "Processing..." : "Withdraw Funds"}
                        >
                            {isLoading ? (
                                <div className="Loading-btn">
                                    <FaSpinner className="loading-spinner" size={20} />
                                    Processing...
                                </div>
                            ) : (
                                <div className="Submit-btn-text">Withdraw</div>
                            )}
                        </button>
                    </div>
                </div>
            </div>

        )}

        {success && (
            <div className="success-modal-overlay">
                <div className="success-modal-content">
                    <div className="success-icon-wrapper">
                        <FaCheckCircle size={80} className="success-icon-animated" />
                    </div>
                    <h2>Withdrawal Successful!</h2>
                    <p>{success}</p>
                    <div className="success-details">
                        <div className="detail-item">
                            <span className="detail-label">Amount:</span>
                            <span className="detail-value">${amount.toFixed(2)}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Method:</span>
                            <span className="detail-value">
                                {selectedMethod === "card" && "Credit Card"}
                                {selectedMethod === "momo" && "Mobile Money (MTN)"}
                                {selectedMethod === "orange" && "Orange Money"}
                            </span>
                        </div>
                    </div>
                    <button 
                        className="success-close-btn"
                        onClick={() => {
                            setSuccess("")
                            navigate("/dashboard")
                        }}
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        )}

        </>
    )

}
export default WithdrawPage