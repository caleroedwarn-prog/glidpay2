import { useEffect, useState } from "react";
import "../style/Dashboard.css";
import { IoNotifications } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { getBalance } from "../api/wallet";
import { type WalletBalance } from "../types/wallet";
function DashboardPage(){
    const [showBalance, setShowBalance] = useState(false);
    const [ balance, setBalance ] = useState< number | null >(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const toggleBalance = () => {
        setShowBalance(!showBalance)
    }

    const exchangeRate = {
        XAF_TO_USD: 0.0016,
        XAF_TO_NGN: 2.48,
        USD_TO_XAF: 620,
        USD_TO_NGN: 1550,
        NGN_TO_XAF: 0.40,
        NGN_TO_USD: 0.00064
    }

    useEffect(() => {
        const fetchBalance = async() => {
            setIsLoading(true)
            try{
                const data: WalletBalance = await getBalance()
                setBalance(data.balance)
            } catch{
                setError("Failed to load balance")
            }finally{
                setIsLoading(false)
            }
        }
        fetchBalance()
    }, [])
    return(
        <>
        <div className="borderBox">
            <div className="boxShape">
                <div className="topBar">
                    <div className="bar-logo">
                        <img src="/images/glidpay-logo.png" alt="logo" />
                    </div>
                    <div className="top-actions">
                        <div className="notif-wrapper">
                            <IoNotifications size={24} color="white" className="bell" />
                            <span className="notif-dot"></span>
                        </div>
                        <div className="profile-img">
                            <img src="/images/key.jpg" alt="profile" />
                        </div>
                    </div>
                </div>

                 <div className="header">
                     <h2>Total Balance:</h2>
                 </div>

                <div className="Balance">
                    <pre>
                       {
                        isLoading ? "Loading..." : showBalance ? `$${balance}`:"*******" 
                       }
                       
                    </pre>
                    <button className="toggle-btn" onClick={toggleBalance}>
                        { showBalance ? <AiOutlineEye size={22}  color="white" /> : <AiOutlineEyeInvisible size={22} color="white" /> }
                    </button>
                </div>
                <div className="error">
                 {error && <p>{error}</p>}
                 </div><br />

                 <div className="transaction_box">
                    <button type="submit"  className="content_type">
                        <p>Deposit</p>
                    </button>

                     <button type="submit" className="content_type">
                        <p>Transfer</p>
                    </button>   

                     <button type="submit" className="content_type">
                        <p>Withdraw</p>
                    </button>

                     <button type="submit" className="content_type1">
                        <pre>History</pre>
                    </button>
                 </div>
            </div>

               <div className="buttom_bar">
                    <div className="content">
                        
                    </div>
                 </div>     
        </div>
        </>
    )
}
export default DashboardPage;