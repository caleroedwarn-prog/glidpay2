import { Link } from "react-router-dom";
import "../style/Navbar.css";

export default function Navbar() {
    return(
        <nav className="navbar">
            <div className="navbar_logo">
                <img src="/images/glidpay-logo.png" alt="logo"></img>
            </div>
            <div className="Link-name">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Registration</Link>
            </div>
        </nav>
    )
}