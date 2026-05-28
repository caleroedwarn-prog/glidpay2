import "../style/Dashboard.css";
import { IoNotifications } from "react-icons/io5";
function DashboardPage(){

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
            </div>
        </div>
        </>
    )
}
export default DashboardPage;