import React, { useState, useEffect } from 'react';

function TicTac() {
  const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const [options, setOptions] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("x");
  const [statusText, setStatusText] = useState("x's turn");
  const [running, setRunning] = useState(true);

  useEffect(() => {
    setStatusText(`${currentPlayer}'s turn`);
  }, [currentPlayer]);

  const cellClicked = (index) => {
    if (options[index] !== "" || !running) {
      return;
    }

    const newOptions = [...options];
    newOptions[index] = currentPlayer;
    setOptions(newOptions);
    checkWinner(newOptions);
  };

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === 'x' ? 'o' : 'x');
  };

  const checkWinner = (options) => {
    let roundWon = false;

    for (let i = 0; i < winCondition.length; i++) {
      const [a, b, c] = winCondition[i];
      if (options[a] && options[a] === options[b] && options[a] === options[c]) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      setStatusText(`${currentPlayer} wins!`);
      setRunning(false);
    } else if (!options.includes("")) {
      setStatusText("Draw!");
      setRunning(false);
    } else {
      changePlayer();
    }
  };

  const restartGame = () => {
    setOptions(Array(9).fill(""));
    setCurrentPlayer("x");
    setStatusText("x's turn");
    setRunning(true);
  };

  return (
    <div id='gameContainer'>
      <h1>Tic Tac Toe</h1>
      <div id='cellContainer'>
        {options.map((option, index) => (
          <div
            key={index}
            className='cell'
            onClick={() => cellClicked(index)}
            cellindex={index}
          >
            {option}
          </div>
        ))}
      </div>
      <h2 id='statusText'>{statusText}</h2>
      <button id='restartBtn' onClick={restartGame}>Restart</button>
    </div>
  );
}

export default TicTac;
