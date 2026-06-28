import { type DepositeRequest } from "../types/wallet";
import { deposit } from "../api/wallet";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoReturnDownBack } from "react-icons/io5";
import { FaCreditCard, FaMobileAlt, FaSpinner, FaTimes, FaCheckCircle } from "react-icons/fa";
import "../style/deposite.css";

const DepositePage = () => {
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState<"credit-card" | "momo" | "orange" | "">("");
  const [amount, setAmount] = useState<number>(0);

  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardExpiry, setExpiry] = useState<string>("");
  const [cardCVV, setCVV] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const isValidCardNumber = (number: string): boolean => {
    const cleaned = number.replace(/\D/g, "");
    if (!/^\d{13,19}$/.test(cleaned)) return false;

    let sum = 0;
    let shouldDouble = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = Number(cleaned[i]);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  };

  const isValidExpiry = (expiry: string): boolean => {
    const cleaned = expiry.replace(/\D/g, "");
    if (cleaned.length !== 4) return false;

    const month = Number(cleaned.slice(0, 2));
    const year = Number(cleaned.slice(2));

    if (month < 1 || month > 12) return false;

    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;

    return true;
  };

  const isValidMomoNumber = (value: string): boolean => /^6\d{8}$/.test(value);
  const isValidCvv = (value: string): boolean => /^\d{3,4}$/.test(value);
  const isValidAmount = (value: number | undefined): boolean => typeof value === "number" && value > 0 && value <= 500000;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const numValue = rawValue === "" ? 0 : Number(rawValue);

    if (numValue > 500000) {
      setError("Maximum deposit is 500,000frs");
      return;
    }

    setError("");
    setAmount(numValue);
  };

  const handleCreditCardSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.substring(0, 16);
    setCardNumber(value.replace(/(\d{4})(?=\d)/g, "$1 "));
  };

  const handleExpirySubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) value = `${value.slice(0, 2)}/${value.slice(2)}`;
    setExpiry(value);
  };

  const handleCvvSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 4);
    setCVV(value);
  };

  const handleMomoSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 9);
    setPhoneNumber(value);
  };

  const handleOrangeSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 9);
    setPhoneNumber(value);
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!isValidAmount(amount)) {
      setError("Please enter a valid amount");
      return;
    }

    if (selectedMethod === "credit-card") {
      if (!isValidCardNumber(cardNumber)) {
        setError("Please enter a valid credit card number");
        return;
      }

      if (!isValidCvv(cardCVV)) {
        setError("Please enter a valid CVV");
        return;
      }

      if (!isValidExpiry(cardExpiry)) {
        setError("Please enter a valid expiry date");
        return;
      }
    }

    if (selectedMethod === "momo" || selectedMethod === "orange") {
      if (!isValidMomoNumber(phoneNumber)) {
        setError("Please enter a valid mobile money number");
        return;
      }
    }

    setLoading(true);

    try {
      const body: DepositeRequest = {
        amount,
        method: selectedMethod === "credit-card" ? "credit-card" : selectedMethod,
        ...(selectedMethod === "credit-card" && {
          expiry: cardExpiry,
          cvv: cardCVV,
          phoneNumber,
        }),
        ...(selectedMethod === "momo" && {
          phoneNumber,
          provider: "MTN",
        }),
        ...(selectedMethod === "orange" && {
          phoneNumber,
          provider: "ORANGE",
        }),
      };

      const response = await deposit(body);
      setSuccess(response.message);
      window.setTimeout(() => {
        setSelectedMethod("");
        setAmount(0);
        setCardNumber("");
        setExpiry("");
        setCVV("");
        setPhoneNumber("");
        setSuccess("");
        navigate("/dashboard");
      }, 2500);
    } catch {
      setError("Failed to place deposit, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="deposit_dashboard_page">
        <div className="deposit_header">
          <button title="back to Dashboard" onClick={() => navigate("/dashboard")}>
            <IoReturnDownBack size={24} />
          </button>
          <div>
            <h2>Deposit Funds</h2>
            <span className="withdrawal_subtitle">
              Choose a secure deposit method and complete your payment flow in minutes.
            </span>
          </div>
        </div>
      </div>

      <div className="Depost_Method-container">
        <div className="Deposite_method-selection">
          <button
            className={`deposit_method-btn ${selectedMethod === "credit-card" ? "active" : ""}`}
            onClick={() => setSelectedMethod("credit-card")}
            title="Deposit with card"
          >
            <FaCreditCard size={24} />
            <span>Card</span>
          </button>
          <button
            className={`deposit_method-btn ${selectedMethod === "momo" ? "active" : ""}`}
            onClick={() => setSelectedMethod("momo")}
            title="Deposit with Mobile Money"
          >
            <FaMobileAlt size={24} />
            <span>MTN</span>
          </button>
          <button
            className={`deposit_method-btn ${selectedMethod === "orange" ? "active" : ""}`}
            onClick={() => setSelectedMethod("orange")}
            title="Deposit with Orange Money"
          >
            <FaMobileAlt size={24} />
            <span>Orange</span>
          </button>
        </div>
      </div>

      {selectedMethod && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button type="button" title="Close" className="modal-close-btn" onClick={() => setSelectedMethod("")}>
              <FaTimes size={20} />
            </button>

            <h3>
              {selectedMethod === "credit-card" && "Card Deposit"}
              {selectedMethod === "momo" && "MTN Mobile Money Deposit"}
              {selectedMethod === "orange" && "Orange Money Deposit"}
            </h3>

            <div className="General_Form-input">
              <label htmlFor="amount">Amount</label>
              <input type="number" placeholder="Enter Amount" value={amount || ""} onChange={handleAmountChange} />
              {error && <p className="error-text-message">{error}</p>}
            </div>

            {selectedMethod === "credit-card" && (
              <>
                <div className="card-preview-section">
                  <div className="card-preview">
                    <div className="card-preview-chip"></div>
                    <div className="card-preview-logo">
                      <span>VISA</span>
                    </div>
                    <div className="card-preview-number">
                      {cardNumber ? cardNumber : "•••• •••• •••• ••••"}
                    </div>
                    <div className="card-preview-details">
                      <div className="cardholder">
                        <span className="label">Card Holder</span>
                        <span className="value">YOUR NAME</span>
                      </div>
                      <div className="card-expiry">
                        <span className="label">Expires</span>
                        <span className="value">{cardExpiry || "MM/YY"}</span>
                      </div>
                    </div>
                  </div>
                  <p className="card-preview-hint">Add your card details below to complete the deposit.</p>
                </div>

                <div className="Card_selectecMethod-input">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input type="text" placeholder="Card Number" value={cardNumber} onChange={handleCreditCardSubmit} />

                  <label htmlFor="expiry">Expiry Date</label>
                  <input type="text" placeholder="MM/YY" value={cardExpiry} onChange={handleExpirySubmit} />

                  <label htmlFor="cvv">CVV</label>
                  <input type="text" placeholder="123" value={cardCVV} onChange={handleCvvSubmit} />
                </div>
              </>
            )}

            {selectedMethod === "momo" && (
              <div className="provider-section provider-section-mtn">
                <div className="provider-badge">MTN Mobile Money</div>
                <p className="provider-message">
                  Please confirm the transaction process from your provider.
                </p>
                <div className="MobileMoney_selectedMethod-input">
                  <label htmlFor="MobileMoney">Mobile Money (MTN)</label>
                  <input type="text" placeholder="Enter phone number" value={phoneNumber} onChange={handleMomoSubmit} />
                </div>
              </div>
            )}

            {selectedMethod === "orange" && (
              <div className="provider-section provider-section-orange">
                <div className="provider-badge">Orange Money</div>
                <p className="provider-message">
                  Please confirm the transaction process from your provider.
                </p>
                <div className="OrangeMoney_selectedMethod-input">
                  <label htmlFor="OrangeMoney">Orange Money</label>
                  <input type="text" placeholder="Enter phone number" value={phoneNumber} onChange={handleOrangeSubmit} />
                </div>
              </div>
            )}

            <div className="Submit_deposit">
              <button className="Submit-btn" onClick={handleSubmit} disabled={loading} title={loading ? "Processing..." : "Deposit Funds"}>
                {loading ? (
                  <div className="Loading-btn">
                    <FaSpinner className="loading-spinner" size={20} />
                    Processing...
                  </div>
                ) : (
                  <div className="Submit-btn-text">Deposit</div>
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
            <h2>Deposit Successful!</h2>
            <p>{success}</p>
            <div className="success-details">
              <div className="detail-item">
                <span className="detail-label">Amount:</span>
                <span className="detail-value">${amount.toFixed(2)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Method:</span>
                <span className="detail-value">
                  {selectedMethod === "credit-card" && "Credit Card"}
                  {selectedMethod === "momo" && "Mobile Money (MTN)"}
                  {selectedMethod === "orange" && "Orange Money"}
                </span>
              </div>
            </div>
            <button
              className="success-close-btn"
              onClick={() => {
                setSuccess("");
                navigate("/dashboard");
              }}
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DepositePage;
