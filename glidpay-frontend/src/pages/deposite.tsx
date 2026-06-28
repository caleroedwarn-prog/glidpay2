import { type DepositeRequest } from "../types/wallet";
import { deposit } from "../api/wallet";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DepositePage = () => {

    const navigate = useNavigate();

    //method

    const [selectedMethod, setSelectedMethod] = useState<string>("");

    //Global

    const [amount, setAmount] = useState<number>();

   // Credit Card Details

   const [cardNumber, setCardNumber] = useState<string>("");
   const [cardExpiry, setExpiry] = useState<string>("");
   const [cardCVV, setCVV] = useState<string>("");

   // Momo & Orange details

   const [phoneNumber, setPhoneNumber] = useState<string>("");

   // UI state

   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string>("");
   const [success, setSuccess] = useState<string>("");


   //validation using (luhn algorithm) for credit card number

   const isValidCardNumber = (number: string): boolean => {
    const cleaned = number.replace(/\D/g, "");
    if(!/^\d{13,19}$/.test(cleaned)) return false;

    let sum = 0;
    let shouldDouble = false;
    let i;
    let digit;

    for(i = cleaned.length - 1; i >= 0; i--){
        digit = parseInt(cleaned[i]);
        if(shouldDouble){
            digit *= 2;
            if(digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
   }

   const isValidExpiry = (expiry : string): boolean => {
    let value = expiry.target.value.replace(/\D/g, ""); 

    if(value.length > 4){
        value = value.slice(0, 4);
    }
     // foramt MM/YY
     if(value.length > 2){
        value = value.slice(0, 2) + "/" + value.slice(2);
     }

     setExpiry(value);
   }

   //validation for momo number

   const isValidMomoNumber = (value : string): boolean => {
    return /^6\d{8}$/.test(value)
   }

   //validation for cvv

   const isValidCvv = (value : string): boolean => {
    return /^\d{3, 4}$/.test(value)
   }



   // handleSubmits

   const handleCreditCardSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    value = value.substring(0, 16);

    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");

    setCardNumber(formattedValue);
   }


   const handleExpirySubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); 

    if(value.length > 4){
        value = value.slice(0, 4);
    }
    // format MM/YY
    if(value.length > 2){
        value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpiry(value);
   }

   const handleCvvSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.substring(0, 4);
    setCVV(value);
   }

   const handleMomoSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.substring(0, 9);
    setMomoNumber(value);
   }

   const handleSubmit = async()=> {
    setError("");
    setSuccess("");

    if(!amount || amount <= 0){
        setError("Please enter a valid amount");
        return;
    }

    if(selectedMethod === "credit-card"){
        if(!isValidCardNumber(cardNumber)){
            setError("Please enter a valid credit card number");
            return;
        }

        if(!isValidCvv(cardCVV)){
            setError("Please enter a valid CVV");
            return;
        }

        if(!isValidExpiry(cardExpiry)){
            setError("Please enter a valid expiry date");
            return;
        }
    }
    if(selectedMethod === "momo" || selectedMethod === "orange"){
        if(!isValidMomoNumber(momoNumber)){
            setError("Please enter a valid mobile money number");
            return;
        }
    }

    setLoading(true)

    try {
        const body: DepositeRequest = {
            amount,
            method: selectedMethod,
            ...(selectedMethod === "credit-card" && {
                cardNumber,
                cardExpiry,
                cardCVV
            }),

            ...(selectedMethod === "momo" && {
                phoneNumber,
                provider: "MTN"
            }),

            ...(selectedMethod === "orange" && {
                phoneNumber,
                provider: "ORANGE"
            })
        }
        const response = await deposit(body);
        setSuccess(response.message);
        setTimeout(() => {
            setSelectedMethod("");
            setAmount(0);
            setCardNumber("");
            setExpiry("");
            setCVV("");
            setPhoneNumber("");
            setSuccess("");
            navigate("/dashboard");
        }, 2500);
    }catch {
        setError("Failed to place deposit, try again Later");
    }finally{
        setLoading(false)
    }

   }
}

