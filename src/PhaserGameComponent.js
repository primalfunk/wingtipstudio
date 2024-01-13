import React, { useEffect } from 'react';
import { initializePhaserGame } from './PhaserGame';

const PhaserGameComponent = () => {
    useEffect(() => {
        const game = initializePhaserGame('phaser-game-container');

        return () => game.destroy(true);
    }, []);

    return <div id="phaser-game-container" />;
};

export default PhaserGameComponent;