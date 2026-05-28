import { useState } from "react";
import "../style/Dashboard.css";
import { IoNotifications } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
function DashboardPage(){
    const [isShow, setIsShow] = useState(false);
    const toggleBalance = () => {
        setIsShow(!isShow)
    }
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

                <div className="Balance">
                    <h2>Total Balance</h2>
                    <p>Balance:
                       {isShow? "2038" : "*********"}
                    </p>
                    <button className="toggle-btn" onClick={toggleBalance}>
                        { isShow ? <AiOutlineEye size={22} color="white" /> : <AiOutlineEyeInvisible size={22} color="white" /> }
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}
export default DashboardPage;