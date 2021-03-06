import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }

  return squares;
}

const App = () => {

  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares());
  const [player, setPlayer] = useState(PLAYER_1)
  const [winner, setWinner] = useState(null)
  

  const onClickCallback = (updatedSquare) => {
    const squareList = [];
    if (winner === null) {
      squares.forEach((row, i) => {
        squareList.push([]);
        row.forEach(square => {
          if (square.id === updatedSquare.id && square.value === '') {
            squareList[i].push(updatedSquare); 
            if (player === PLAYER_1) {
              setPlayer(PLAYER_2);
            } else if (player === PLAYER_2) {
              setPlayer(PLAYER_1);
            }
          } else {
            squareList[i].push(square);
          }
        })
      })
      setSquares(squareList);

      checkForWinner(squareList);
    }

  };
  
  // Wave 2
  // You will need to create a method to change the square 
  //   When it is clicked on.
  //   Then pass it into the squares as a callback


  const checkForWinner = (squares) => {
    const flattenarray = [].concat(...squares);
    
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (flattenarray[a].value && flattenarray[a].value === flattenarray[b].value && flattenarray[a].value === flattenarray[c].value) {
        setWinner(flattenarray[a].value);
        return true;
      }
    }
    return null;
    // Complete in Wave 3
    // You will need to:
    // 1. Go accross each row to see if 
    //    3 squares in the same row match
    //    i.e. same value
    // 2. Go down each column to see if
    //    3 squares in each column match
    // 3. Go across each diagonal to see if 
    //    all three squares have the same value.

  }

  const resetGame = () => {
    // Complete in Wave 4
    setPlayer(PLAYER_1);
    setWinner(null);
    setSquares(generateSquares());
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>{winner ? `Winner is ${winner}` : `Current Player is ${player}`}</h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback} player={player}/>
      </main>
    </div>
  );
}

export default App;
