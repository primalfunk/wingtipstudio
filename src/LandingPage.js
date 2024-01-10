import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.scss';
import NavigationPane from './NavigationPane';


function LandingPage() {
    const [animate, setAnimate] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [activeQuadrants, setActiveQuadrants] = useState([]);
    const [wingtipButtonVisible, setWingtipButtonVisible] = useState(true);
    const [wingtipButtonTextVisible, setWingtipButtonTextVisible] = useState(true);
    const [animationsCompleted, setAnimationsCompleted] = useState(false);
    const [exitAnimation, setExitAnimation] = useState(false);

    useEffect(() => {
        console.log("Component mounted. Initial states:", { animate, showImage, activeQuadrants });
    }, []);

    const handleClick = () => {
        setAnimate(true);
        setShowImage(true);
    
        setTimeout(() => setActiveQuadrants(prev => [...prev, 'expandCode']), 3000);
        setTimeout(() => setActiveQuadrants(prev => [...prev, 'expandMusic']), 4000);
        setTimeout(() => setActiveQuadrants(prev => [...prev, 'expandContact']), 5000);
        setTimeout(() => setActiveQuadrants(prev => [...prev, 'expandHireMe']), 6000);
        setTimeout(() => {
            setActiveQuadrants(prev => [...prev, 'showText']);
            setWingtipButtonTextVisible(false);
            setWingtipButtonVisible(false);
        }, 9000);
        setTimeout(() => {
            setAnimationsCompleted(true);
        }, 9000); 
    };

    useEffect(() => {
        console.log("States updated:", { animate, showImage, activeQuadrants });
    }, [animate, showImage, activeQuadrants]);

    const navigate = useNavigate();

    const handleCodeClick = () => {
        setExitAnimation(true);
        setTimeout(() => {
            navigate('/code');
        }, 5000);
    };

    const handleMusicClick = () => {
        setExitAnimation(true);
        setTimeout(() => {
            navigate('/music');
        }, 5000);
    };
    const handleContactClick = () => {
        setExitAnimation(true);
        setTimeout(() => {
            navigate('/contact');
        }, 5000);
    };

    const handleHireMeClick = () => {
        setExitAnimation(true);
        setTimeout(() => {
            navigate('/hireme');
        }, 5000);
    };

    return (
        <div className={`landing-page ${showImage ? 'transparent-bg' : ''} ${exitAnimation ? 'fade-out' : ''}`}>
            <div className="image-background" />
            <div className={`black-cover ${showImage ? 'hide' : ''}`} />
            {wingtipButtonVisible && (
                <button 
                    className={`wingtip-button ${!wingtipButtonTextVisible ? 'text-invisible' : ''}`} 
                    onClick={handleClick}
                    style={{ opacity: wingtipButtonVisible ? 1 : 0, transition: 'opacity 2s ease' }}
                >
                    {wingtipButtonTextVisible ? 'Welcome to Wingtip Studio' : ''}
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
