import { Link } from "react-router-dom";
import "../style/navbar.css";
import { memo } from "react";

export default memo(function Navbar() {
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id)
        if(section){
            const navbarHeight = 90
            const top = section.offsetTop - navbarHeight
            window.scrollTo({ top, behavior: "smooth" })
        }
    }
    return(
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="/images/glidpay-logo.png" alt="logo" ></img>
            </div>
            <div className="Link-name">
                <ul className="navbar-links">
                    <Link to="/home"><li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}>Home</a></li></Link>
                    <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection("features"); }}>Features</a></li>
                    <li><a href="#Security" onClick={(e) => { e.preventDefault(); scrollToSection("Security"); }}>Security</a></li>
                </ul>
                <Link to="/login">sign-In</Link>|
                <Link to="/register">get-started</Link>
                <Link to="/dashboard">Dashboard</Link>
            </div>
        </nav>
    )
})