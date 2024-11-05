import { useState, useCallback } from 'react';

type Grid = number[][];
type Direction = 'up' | 'down' | 'left' | 'right';

export function use2048() {
  const [grid, setGrid] = useState<Grid>(() => initializeGrid());
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  function initializeGrid(): Grid {
    const newGrid = Array(4).fill(null).map(() => Array(4).fill(0));
    addNewTile(newGrid);
    addNewTile(newGrid);
    return newGrid;
  }

  function addNewTile(grid: Grid): void {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) {
          emptyCells.push({ x: i, y: j });
        }
      }
    }
    
    if (emptyCells.length > 0) {
      const { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      grid[x][y] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  const move = useCallback((direction: Direction) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    let moved = false;
    let newScore = score;

    const rotate = (grid: Grid): Grid => {
      const N = grid.length;
      const rotated = Array(N).fill(null).map(() => Array(N).fill(0));
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          rotated[j][N - 1 - i] = grid[i][j];
        }
      }
      return rotated;
    };

    const moveLeft = (grid: Grid): [Grid, number, boolean] => {
      let moved = false;
      let score = 0;
      
      for (let i = 0; i < 4; i++) {
        let row = grid[i].filter(cell => cell !== 0);
        for (let j = 0; j < row.length - 1; j++) {
          if (row[j] === row[j + 1]) {
            row[j] *= 2;
            score += row[j];
            row.splice(j + 1, 1);
            moved = true;
          }
        }
        const newRow = row.concat(Array(4 - row.length).fill(0));
        if (JSON.stringify(grid[i]) !== JSON.stringify(newRow)) {
          moved = true;
        }
        grid[i] = newRow;
      }
      
      return [grid, score, moved];
    };

    switch (direction) {
      case 'left':
        [newGrid, newScore, moved] = moveLeft(newGrid);
        break;
      case 'right':
        newGrid = newGrid.map(row => row.reverse());
        [newGrid, newScore, moved] = moveLeft(newGrid);
        newGrid = newGrid.map(row => row.reverse());
        break;
      case 'up':
        newGrid = rotate(rotate(rotate(newGrid)));
        [newGrid, newScore, moved] = moveLeft(newGrid);
        newGrid = rotate(newGrid);
        break;
      case 'down':
        newGrid = rotate(newGrid);
        [newGrid, newScore, moved] = moveLeft(newGrid);
        newGrid = rotate(rotate(rotate(newGrid)));
        break;
    }

    if (moved) {
      addNewTile(newGrid);
      setGrid(newGrid);
      setScore(score + newScore);
      
      // Check for game over
      const isGameOver = !canMove(newGrid);
      setGameOver(isGameOver);
    }
  }, [grid, score]);

  function canMove(grid: Grid): boolean {
    // Check for empty cells
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) return true;
      }
    }

    // Check for possible merges
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          (i < 3 && grid[i][j] === grid[i + 1][j]) ||
          (j < 3 && grid[i][j] === grid[i][j + 1])
        ) {
          return true;
        }
      }
    }

    return false;
  }

  const resetGame = useCallback(() => {
    setGrid(initializeGrid());
    setScore(0);
    setGameOver(false);
  }, []);

  return {
    grid,
    score,
    gameOver,
    move,
    resetGame
  };
}