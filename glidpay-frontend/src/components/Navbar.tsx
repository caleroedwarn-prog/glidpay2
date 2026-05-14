import { Link } from "react-router-dom";
import "../style/navbar.css";
import { memo } from "react";

export default memo(function Navbar() {
    return(
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="/images/glidpay-logo.png" alt="logo" ></img>
            </div>
            <div className="Link-name">
                <Link to="/">Home</Link>
                <Link to="/features">Features</Link>
                <Link to="/login">sign-In</Link>|
                <Link to="/register">get-started</Link>
                <Link to="/dashboard">Dashboard</Link>
            </div>
        </nav>
    )
})