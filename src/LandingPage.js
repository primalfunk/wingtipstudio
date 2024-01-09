import React, { useState, useEffect } from 'react';
import './LandingPage.scss';

function LandingPage() {
    const [animate, setAnimate] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [activeQuadrants, setActiveQuadrants] = useState([]);
    const [wingtipButtonVisible, setWingtipButtonVisible] = useState(true);
    const [wingtipButtonTextVisible, setWingtipButtonTextVisible] = useState(true);

    useEffect(() => {
        console.log("Component mounted. Initial states:", { animate, showImage, activeQuadrants });
    }, []);

    const handleClick = () => {
        setAnimate(true);
        setShowImage(true);
    
        setTimeout(() => setActiveQuadrants(prev => [...prev, 'expandCode']), 5000);
        setTimeout(() => setActiveQuadrants(prev => [...prev, 'expandMusic']), 6000);
        setTimeout(() => setActiveQuadrants(prev => [...prev, 'expandContact']), 7000);
        setTimeout(() => setActiveQuadrants(prev => [...prev, 'expandHireMe']), 8000);
        setTimeout(() => {
            setActiveQuadrants(prev => [...prev, 'showText']);
            setWingtipButtonTextVisible(false);
            setWingtipButtonVisible(false);
        }, 11000);
    };

    useEffect(() => {
        console.log("States updated:", { animate, showImage, activeQuadrants });
    }, [animate, showImage, activeQuadrants]);

    const handleCodeClick = () => {
        console.log("Navigate to Code page");
        // Here you can add navigation logic
    };

    const handleMusicClick = () => {
        console.log("Navigate to Music page");
        // Navigation logic
    };

    const handleContactClick = () => {
        console.log("Navigate to Contact page");
        // Navigation logic
    };

    const handleHireMeClick = () => {
        console.log("Navigate to Hire Me page");
        // Navigation logic
    };

    return (
        <div className={`landing-page ${showImage ? 'transparent-bg' : ''}`}>
            <div className="image-background" /> {/* This div represents the background image */}

            {/* Add the black cover div below */}
            <div className={`black-cover ${showImage ? 'hide' : ''}`} />
            {wingtipButtonVisible && (
                <button 
                    className={`wingtip-button ${!wingtipButtonTextVisible ? 'text-invisible' : ''}`} 
                    onClick={handleClick}
                    style={{ opacity: wingtipButtonVisible ? 1 : 0, transition: 'opacity 2s ease' }}
                >
                    {wingtipButtonTextVisible ? 'Wingtip Studio' : ''}
                </button>
            )}
            <div className="quadrant-container">
                <div className={`quadrant-button music-button ${activeQuadrants.includes('expandMusic') ? 'expandMusic' : ''}`} onClick={handleMusicClick}>
                        <span style={{ animationDelay: activeQuadrants.includes('showText') ? '0s' : '10s' }}>Music</span>
                </div>
                <div className={`quadrant-button code-button ${activeQuadrants.includes('expandCode') ? 'expandCode' : ''}`}onClick={handleCodeClick}>
                    <span style={{ animationDelay: activeQuadrants.includes('showText') ? '0s' : '10s' }}>Code</span>
                </div>
                <div className={`quadrant-button contact-button ${activeQuadrants.includes('expandContact') ? 'expandContact' : ''}`}onClick={handleContactClick}>
                    <span style={{ animationDelay: activeQuadrants.includes('showText') ? '0s' : '10s' }}>Contact</span>
                </div>
                <div className={`quadrant-button hireme-button ${activeQuadrants.includes('expandHireMe') ? 'expandHireMe' : ''}`}onClick={handleHireMeClick}>
                    <span style={{ animationDelay: activeQuadrants.includes('showText') ? '0s' : '10s' }}>Hire</span>
                </div>
            </div>
            <div className="navigation-pane">
                <a href="#code">Code</a>
                <a href="#music">Music</a>
                <a href="#contact">Contact</a>
                <a href="#hireme">Hire Me</a>
                <span>All Rights Reserved 2024</span>
            </div>
        </div>
    );
}

export default LandingPage;
