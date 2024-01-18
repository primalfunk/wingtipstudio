import React, { useEffect } from 'react';
import { initializePhaserGame } from './PhaserGame';
import './PhaserGameComponent.css'

const PhaserGameComponent = () => {
    useEffect(() => {
        const game = initializePhaserGame('phaser-game-container');

        return () => game.destroy(true);
    }, []);

    return <div className="game-page">
            <div className="game-obj" id="phaser-game-container" />
        </div>
};

export default PhaserGameComponent;