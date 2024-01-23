import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Hamburger.scss';

function Hamburger() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="navigation-pane">
          <div className="nav-container">
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
          </div>
        </div>
    );
}

export default Hamburger;