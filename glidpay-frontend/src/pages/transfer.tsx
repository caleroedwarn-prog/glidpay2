import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { transfer } from "../api/wallet";
import { type TransferRequest } from "../types/wallet";
import { FaArrowLeft } from "react-icons/fa6";
import "../style/transfer.css";

const TransferPage = () => {

    const navigate = useNavigate();

    const [recipient, setRecipient] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [pin, setPin] = useState<string>("");

    // UI
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccesss] = useState<boolean>(false);

    const isValidRecipient = (value: string): boolean => {
        return value.trim().length > 0;
    }

    const isValidAmount = (value: number): boolean => {
        return value > 0 && value <= 500000;
    }

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         const cleaned = e.target.value.replace(/[^0-9]/g, '');
         let numValue = parseInt(cleaned);

        if(numValue > 500000){
            setError("Amount cannot exceed 500,000fr")
            numValue = 500000
        }else{
            setError("")
        }
        setAmount(numValue);
    }


    const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/^\D/g, '');
        value = value.substring(0, 6);
        setPin(value);
    }

    const handleSubmit = async () => {
        setError("");
        setSuccesss(false);

        if(!isValidAmount){
            setError("Invalid amount. Maximum is 500,000fr");
            return;
        }
        if(!isValidRecipient(recipient)){
            setError("Invalid recipient, or user not found");
            return;
        }
        if(pin.length !== 6){
            setError("Invalid pin, must be 6 digits");
            return;
        }

        setLoading(true);

        try{
            const body: TransferRequest = {
                amount,
                pin,
                recipient,
                message: true
            }
            const response = await transfer(body);
            if(response.message){
               setSuccesss(true)
            }else {
                    setError("Deposit could not be completed. Please try again.");
                    setLoading(false);
                    return;
                  }
        }catch {
            setError("Transfer failed, please try again");
        }finally{
            setLoading(false);
        }
    }

    return (
        <>
            <button className="transfer-back-btn" title="back" type="button" onClick={() => navigate("/dashboard")}>
                <FaArrowLeft size={18} />
                <span>Back to dashboard</span>
            </button>

            <div className="transfer-page">
                <header className="transfer-hero">
                    <div className="transfer-hero-copy">
                        <p className="transfer-chip">Secure transfer</p>
                        <h1>Recipient transfer details</h1>
                        <p>Send funds with confidence using Glidpay’s secure recipient workflow.</p>
                    </div>
                    <div className="transfer-hero-card">
                        <p className="hero-card-label">Ready to send</p>
                        <h2>Pay the right recipient, every time.</h2>
                        <div className="hero-card-grid">
                            <span>Instant delivery</span>
                            <span>Bank-grade security</span>
                            <span>Up to 500,000fr</span>
                        </div>
                    </div>
                </header>

                <main className="transfer-panel">
                    <section className="transfer-form-card">
                        <div className="transfer-card-header">
                            <div>
                                <p className="transfer-card-subtitle">Recipient information</p>
                                <h2>Confirm recipient and amount</h2>
                            </div>
                        </div>

                        <div className="form-input">
                            <label htmlFor="recipient">Recipient</label>
                            <input
                                id="recipient"
                                title="Recipient"
                                type="text"
                                placeholder="Enter recipient username or phone"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                            />

                            <label htmlFor="amount">Amount (CFA)</label>
                            <input
                                id="amount"
                                title="Amount"
                                type="text"
                                placeholder="Enter transfer amount"
                                value={amount}
                                onChange={handleAmountChange}
                            />

                            <label htmlFor="pin">Security PIN</label>
                            <input
                                id="pin"
                                title="Pin"
                                type="password"
                                placeholder="••••••"
                                value={pin}
                                onChange={handlePinChange}
                            />

                            {error && <p className="error">{error}</p>}
                            {success && <p className="success">{success}</p>}

                            <button className="transfer-submit-btn" title="submit" type="button" onClick={handleSubmit} disabled={loading}>
                                {loading ? "Processing transfer..." : "Confirm transfer"}
                            </button>
                        </div>
                    </section>

                    <aside className="transfer-sidebar">
                        <div className="sidebar-card">
                            <h3>Recipient checklist</h3>
                            <ul>
                                <li>Valid recipient username or wallet ID</li>
                                <li>Amount must not exceed 500,000fr</li>
                                <li>Use your secure 6-digit PIN</li>
                            </ul>
                        </div>
                        <div className="sidebar-card highlight-card">
                            <h3>Need help?</h3>
                            <p>Double-check the recipient before sending to avoid delays. Transfers are processed instantly once confirmed.</p>
                        </div>
                    </aside>
                </main>
            </div>
        </>
    )
}
export default TransferPage;