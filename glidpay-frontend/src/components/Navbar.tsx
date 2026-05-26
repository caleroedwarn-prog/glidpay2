import { Link } from "react-router-dom";
import "../style/navbar.css";
import { memo } from "react";
import { useNavigate, useLocation } from "react-router-dom"

export default memo(function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()

    const handleNavClick = (id: string) => {
        if (location.pathname !== "/") {
            navigate("/")
            setTimeout(() => scrollToSection(id), 100)
        } else {
            scrollToSection(id)
        }
    }

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id)
        if (section) {
            const navbarHeight = 120
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
                    <Link to="/home"><li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection("home"); handleNavClick("home") }}>Home</a></li></Link>
                    <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection("features"); }}>Features</a></li>
                    <li><a href="#Security" onClick={(e) => { e.preventDefault(); scrollToSection("Security"); }}>Security</a></li>
                    <li><a href="#How-it-works" onClick={(e) => { e.preventDefault(); scrollToSection("How-it-works"); }}>How it works</a></li>
                    <li><a href="#home" onClick={(e) => {e.preventDefault(); scrollToSection("about")}}>About</a></li>
                </ul>
            </div>
        </nav>
    )
})