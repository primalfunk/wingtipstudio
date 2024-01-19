export class GameOfLifeLogic {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = this.createGrid(rows, cols);
        console.log("Creating grid of " + rows + ", " + cols);
    }

    createGrid(rows, cols) {
        let grid = new Array(rows);
        for (let i = 0; i < rows; i++) {
            grid[i] = new Array(cols);
            for (let j = 0; j < cols; j++) {
                grid[i][j] = { alive: 0, age: 0 }; // Each cell is an object
            }
        }
        return grid;
    }

    resetGrid() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j] = {
                    alive: Math.random() > 0.5 ? 1 : 0,
                    age: 0
                };
            }
        }
        console.log("Grid after reset:", this.grid);
    }

    nextGeneration() {
        let newGrid = this.createGrid(this.rows, this.cols);
    
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let cell = this.grid[i][j];
                let neighbors = this.countNeighbors(i, j);
                let newState = (cell.alive === 1 && (neighbors === 2 || neighbors === 3)) || (cell.alive === 0 && neighbors === 3) ? 1 : 0;
                newGrid[i][j] = { alive: newState, age: newState ? (cell.alive ? cell.age + 1 : 0) : 0 };
            }
        }
    
        this.grid = newGrid;
    }

    countNeighbors(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                let x = (row + i + this.rows) % this.rows;
                let y = (col + j + this.cols) % this.cols;
                count += this.grid[x][y].alive;
            }
        }
        return count;
    }
}
