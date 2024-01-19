import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { GameOfLifeLogic } from './GameOfLifeLogic';
import './GameOfLifeComponent.css'

const GameOfLifeComponent = () => {
    const gameOfLifeLogicRef = useRef(null);
    const phaserGameRef = useRef(null);
    const [running, setRunning] = useState(false);
    const runningRef = useRef(running);
    const [game, setGame] = useState(null);
    
    const cellSize = 15;
    const width = window.innerWidth;
    const height = window.innerHeight * 0.8;
    const cols = Math.floor(width / cellSize);
    const rows = Math.floor(height / cellSize);
    const [gridSize, setGridSize] = useState({ rows, cols });

    const handleReset = () => {
        if (gameOfLifeLogicRef.current) {
            gameOfLifeLogicRef.current.resetGrid();
            if (game && game.scene && game.scene.scenes.length > 0) {
                game.scene.scenes[0].forceUpdate();
            }
        }
    };

    const toggleRunning = () => {
        setRunning(running => {
            const newRunningState = !running;
            runningRef.current = newRunningState;
            return newRunningState;
        });
    };

    useEffect(() => {
        const updateGridSize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight * 0.8;
            const newCols = Math.floor(newWidth / cellSize);
            const newRows = Math.floor(newHeight / cellSize);
            setGridSize({ rows: newRows, cols: newCols });
        };

        updateGridSize();
        window.addEventListener('resize', updateGridSize);
        return () => window.removeEventListener('resize', updateGridSize);
    }, []);

    useEffect(() => {
        runningRef.current = running;
    }, [running]);

    useEffect(() => {
        if (game && game.scene && game.scene.scenes.length > 0) {
            game.scene.scenes[0].forceUpdate();
        }
            runningRef.current = running;
            const colorGradient = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
            const config = {
                type: Phaser.AUTO,
                width: width,
                height: height,
                parent: phaserGameRef.current,
                scene: {
                    create: function() {
                        this.cells = [];
                        this.counter = 0;
                        this.speedFactor = 10;
                        this.hue = 0;
                        const gameOfLifeLogic = gameOfLifeLogicRef.current;
                        for (let y = 0; y < gridSize.rows; y++) {
                            for (let x = 0; x < gridSize.cols; x++) {
                                let cellState = gameOfLifeLogic.grid[y][x].alive;
                                let cellColor = cellState === 1 ? 0xffffff : 0x000000;
                                let cell = this.add.rectangle(
                                    x * cellSize, y * cellSize, cellSize, cellSize, cellColor
                                ).setOrigin(0, 0);
                                this.cells.push(cell);
                            }
                        }
                        this.forceUpdate = () => {
                            for (let i = 0; i < this.cells.length; i++) {
                                let y = Math.floor(i / gridSize.cols);
                                let x = i % gridSize.cols;
                                let cellLogic = gameOfLifeLogic.grid[y][x];
                        
                                // Update cell colors based on the alive status and age
                                if (cellLogic.alive) {
                                    // Bright color for living cells, adjust brightness based on age
                                    let brightness = Math.min(100 + cellLogic.age * 15, 255); // Increase brightness with age
                                    this.cells[i].fillColor = Phaser.Display.Color.GetColor(brightness, brightness, 255); // Blue with varying brightness
                                } else {
                                    // Subdued color for dead cells
                                    this.cells[i].fillColor = Phaser.Display.Color.GetColor(20, 20, 20); // Dark gray
                                }
                            }
                        };
                    },

                    update: function() {
                        const gameOfLifeLogic = gameOfLifeLogicRef.current;
                    
                        if (runningRef.current) {
                            this.counter++;
                            if (this.counter >= this.speedFactor) {
                                gameOfLifeLogic.nextGeneration();
                                this.counter = 0;
                    
                                for (let i = 0; i < this.cells.length; i++) {
                                    let y = Math.floor(i / gridSize.cols);
                                    let x = i % gridSize.cols;
                                    let cellLogic = gameOfLifeLogic.grid[y][x];
                    
                                    // Bright color for living cells, adjust brightness based on age
                                    if (cellLogic.alive) {
                                        let brightness = Math.min(100 + cellLogic.age * 15, 255); // Increase brightness with age
                                        this.cells[i].fillColor = Phaser.Display.Color.GetColor(brightness, brightness, 255); // Blue with varying brightness
                                    } else {
                                        // Subdued color for dead cells
                                        this.cells[i].fillColor = Phaser.Display.Color.GetColor(20, 20, 20); // Dark gray
                                    }
                                }
                            }
                        }
                    }
                },
            };
            gameOfLifeLogicRef.current = new GameOfLifeLogic(rows, cols);
            gameOfLifeLogicRef.current.resetGrid();
            const newGame = new Phaser.Game(config);

            setGame(newGame);
            return () => {
                if (newGame) {
                    newGame.destroy(true);
                }
                if (game) {
                    game.destroy(true);
                }
            };
        }, [phaserGameRef, gridSize]);

    return (
        <div className="page-container">
            <div className="title">
                Conway's Game of Life Simulation
            </div>
            <div className="sim-container">
                <div ref={phaserGameRef} />
            </div>
            <div className="buttons-container">
                <button className="button" onClick={toggleRunning}>{running ? 'Pause' : 'Start'}</button>
                <button className="button" onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
};

export default GameOfLifeComponent;
