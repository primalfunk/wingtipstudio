import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationPane.scss';

function NavigationPane() {
    return (
        <div className="navigation-pane">
            <Link to="/">Home</Link>
            <Link to="/code">Code</Link>
            <Link to="/music">Music</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/hireme">Hire Me</Link>
            <span>All Rights Reserved 2024</span>
        </div>
    );
}

export default NavigationPane;