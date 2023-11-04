import React from "react";
import { Link } from "react-router-dom"; // Import Link
import './Footer.css';

function Footer() {
    return (
        <footer className="sundar-footer"> {/* Use className instead of class */}
            <div className="footer-content"> {/* Use className instead of class */}
                <p>&copy; 2023 Your Website Name</p>
                <ul>
                    <li><Link to="/">Home</Link></li> {/* Use Link component for navigation */}
                    <li><Link to="/about">About</Link></li> {/* Use Link component for navigation */}
                    <li><Link to="/services">Services</Link></li> {/* Use Link component for navigation */}
                    <li><Link to="/contact">Contact</Link></li> {/* Use Link component for navigation */}
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
