import React from 'react';
import NavigationPane from './NavigationPane';
import { Link } from 'react-router-dom';
import './CodePage.scss'

function CodePage() {
    return (
        <div className='page-wrapper'>
            <NavigationPane />
            <div className='page-header'>
                <h1>Coding Projects</h1>
            </div>
            <div className="background-container">
                <div className="bkg-image" />
            </div>
                <div className="projects-wrapper">
                    <div className="project">
                        <h2>Space Explorer Game</h2>
                        <Link to="/space-game">
                            <img src="/images/space_screen.jpg" alt="Space Explorer Game" className="project-image" />
                        </Link>
                        <p className="explanation">Press Z and X to zoom, side arrows to rotate the ship, and up/down to apply thrust in a zero-G environment. Stars have visible gravity pools, asteroids have random speed, direction and rotation.</p>
                    </div>
                    <div className="project">
                        <h2>Particle Simulations</h2>
                        <Link to="/life-sim">
                            <img src="/images/life_sim_screen.jpg" alt="Particle Simulations" className="project-image" />
                        </Link>
                        <p className="explanation">Using gravitational forces of attracting and repelling, watch as particles come to life and exhibit different kinds of odd behaviors. 'Randomize' to get randomly generated values, and fine-tune when you've found an interesting setting.</p>
                    </div>
                    <div className="project">
                        <h2>Conway's Game of Life</h2>
                        <Link to="/life-game">
                            <img src="/images/life_screen.jpg" alt="Conway's Game of Life" className="project-image" />
                        </Link>
                        <p className="explanation">Start, pause, and reset the simulation of this cellular automaton to observe the emergence of complex patterns from simple rules.</p>
                    </div>
                </div>
        </div>
    ); 
}

export default CodePage;