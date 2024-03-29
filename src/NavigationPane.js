import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavigationPane.scss';

function NavigationPane() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        console.log("Menu is open: " + menuOpen);
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="navigation-pane">
          <div className="nav-container">
            <img
                src={"/images/WingTipStudioLight.png"}
                alt="Wingtip Studio Icon"
                className="wingtip-icon"
            />
            <div className="hamburger" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            {menuOpen && (
                <div className="menu">
                    <Link to="/" onClick={toggleMenu}>Home</Link>
                    <Link to="/code" onClick={toggleMenu}>Code</Link>
                    <Link to="/music" onClick={toggleMenu}>Music</Link>
                    <Link to="/contact" onClick={toggleMenu}>Contact</Link>
                    <Link to="/hireme" onClick={toggleMenu}>Hire Me</Link>
                </div>
            )}

            <span><b>All Rights Reserved 2024</b></span>
          </div>
        </div>
    );
}

export default NavigationPane;