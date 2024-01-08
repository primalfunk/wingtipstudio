import React from 'react';
import './LandingPage.css';

function LandingPage() {
    return (
        <div className="landing-page">
            <button className="wingtip-button">Wingtip Studio</button>
            <div className="navigation-pane">
                <a href="#music">Music</a>
                <a href="#code">Code</a>
                <a href="#contact">Contact</a>
                <a href="#hireme">Hire Me</a>
                <span>All Rights Reserved 2024</span>
            </div>
        </div>
    );
}

export default LandingPage;