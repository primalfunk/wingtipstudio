import React from 'react';
import NavigationPane from './NavigationPane';
import { Link } from 'react-router-dom';
import './CodePage.scss'

function CodePage() {
    return (
        <div className='page-wrapper'>
            <div className='page-header'>
                <h1>Coding Porfolio Projects</h1>
            </div>
            <div className="bkg-image">
                <p className="explanation">Space Explorer Game - press Z and X to zoom, side arrows to rotate the ship, and up/down to apply thrust in a zero-G environment. Stars have visible gravity pools, asteroids have random speed, direction and rotation.</p>
                <div className="game-wrapper">
                    <Link to="/space-game" className="link-button">Play Space Explorer Game</Link>
                </div>
                <div className="life-sim-wrapper">
                    <p className="explanation">Particle Simulations - using gravitational forces of attracting and repelling, watch as particles come to life and exhibit different kinds of interesting behaviors. Fine-tune the forces yourself, or hit 'Randomize' to get randomly generated values.</p>
                    <Link to="/life-sim" className="link-button">Explore Life-like Particle Simulations</Link>
                </div>
                <div className="filler">
                    <p>Further additions to the portfolio projects will go in this space.</p>
                </div>
            </div>
            <NavigationPane />
        </div>
    );
}

export default CodePage;