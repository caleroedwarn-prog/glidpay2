import { Link } from "react-router-dom";
import "../style/navbar.css";

export default function Navbar() {
    return(
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="/images/glidpay-logo.png" alt="logo" ></img>
            </div>
            <div className="Link-name">
                <Link to="/">Home</Link>
                <Link to="/login">sign-In</Link>
                <Link to="/register">sign-Up</Link>
                <Link to="/dashboard">Dashboard</Link>
            </div>
        </nav>
    )
}