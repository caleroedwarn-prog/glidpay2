import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { transfer } from "../api/wallet";
import {type TransferRequest } from "../types/wallet";

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
            setSuccesss(response.message);
        }catch {
            setError("Transfer failed, please try again");
        }finally{
            setLoading(false);
        }
    }

    return (
        
    )
}