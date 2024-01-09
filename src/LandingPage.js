import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './LandingPage.scss';
import NavigationPane from './NavigationPane'; // Import the new component


function LandingPage() {
    const [animate, setAnimate] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [activeQuadrants, setActiveQuadrants] = useState([]);
    const [wingtipButtonVisible, setWingtipButtonVisible] = useState(true);
    const [wingtipButtonTextVisible, setWingtipButtonTextVisible] = useState(true);
    const [animationsCompleted, setAnimationsCompleted] = useState(false);

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
        setTimeout(() => {
            setAnimationsCompleted(true); // Set this after the last animation completes
        }, 11000); 
    };

    useEffect(() => {
        console.log("States updated:", { animate, showImage, activeQuadrants });
    }, [animate, showImage, activeQuadrants]);

    const navigate = useNavigate();

    const handleCodeClick = () => {
        console.log("Navigate to Code page");
        navigate('/code');
    };

    const handleMusicClick = () => {
        console.log("Navigate to Music page");
        navigate('/music');
    };

    const handleContactClick = () => {
        console.log("Navigate to Contact page");
        navigate('/contact');
    };

    const handleHireMeClick = () => {
        console.log("Navigate to Hire Me page");
        navigate('/hireme');
    };

    return (
        <div className={`landing-page ${showImage ? 'transparent-bg' : ''}`}>
            <div className="image-background" />
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
                <div className={`quadrant-button music-button ${activeQuadrants.includes('expandMusic') ? 'expandMusic' : ''}`} style={{ pointerEvents: animationsCompleted ? 'auto' : 'none' }} onClick={handleMusicClick}>
                        <span style={{ animationDelay: activeQuadrants.includes('showText') ? '0s' : '10s' }}>Music</span>
                </div>
                <div className={`quadrant-button code-button ${activeQuadrants.includes('expandCode') ? 'expandCode' : ''}`} style={{ pointerEvents: animationsCompleted ? 'auto' : 'none' }} onClick={handleCodeClick}>
                    <span style={{ animationDelay: activeQuadrants.includes('showText') ? '0s' : '10s' }}>Code</span>
                </div>
                <div className={`quadrant-button contact-button ${activeQuadrants.includes('expandContact') ? 'expandContact' : ''}`} style={{ pointerEvents: animationsCompleted ? 'auto' : 'none' }} onClick={handleContactClick}>
                    <span style={{ animationDelay: activeQuadrants.includes('showText') ? '0s' : '10s' }}>Contact</span>
                </div>
                <div className={`quadrant-button hireme-button ${activeQuadrants.includes('expandHireMe') ? 'expandHireMe' : ''}`} style={{ pointerEvents: animationsCompleted ? 'auto' : 'none' }} onClick={handleHireMeClick}>
                    <span style={{ animationDelay: activeQuadrants.includes('showText') ? '0s' : '10s' }}>Hire</span>
                </div>
            </div>
            <NavigationPane /> 
        </div>
    );
}

export default LandingPage;
