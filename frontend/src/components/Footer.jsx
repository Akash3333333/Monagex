import React from "react";
import { Link } from "react-router-dom"; // Import Link
import './Footer.css';

function Footer() {
    return (
        <footer className="sundar-footer"> {/* Use className instead of class */}
            <div className="footer-content"> {/* Use className instead of class */}
                <p> &copy; 2023 MonageX</p>
                <ul>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
