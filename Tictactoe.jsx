import React, { useState, useRef } from 'react';
import './Tictactoe.css';
import circle_icon from '../Assets/circle1.jpg';
import cross_icon from '../Assets/cross1.jpg';

const Tictactoe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);

  const toggle = (index) => {
    if (lock || board[index] !== "") return;

    const newBoard = [...board];
    newBoard[index] = count % 2 === 0 ? "x" : "o";

    setBoard(newBoard);
    setCount(count + 1);
    checkWin(newBoard);
  };

  const checkWin = (currentBoard) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        won(currentBoard[a]);
        return;
      }
    }

    // Tie condition
    if (!currentBoard.includes("")) {
      setLock(true);
      if (titleRef.current) {
        titleRef.current.innerHTML = "It's a <span>Draw!</span>";
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    if (titleRef.current) {
      titleRef.current.innerHTML = `Congratulations <img src='${
        winner === "x" ? cross_icon : circle_icon
      }' alt='${winner}' /> Won`;
    }
  };

  const reset = () => {
    setBoard(Array(9).fill(""));
    setLock(false);
    setCount(0);
    if (titleRef.current) {
      titleRef.current.innerHTML = 'Tic Tac Toe Game';
    }
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe Game</h1>
      <div className="board">
        {[0, 3, 6].map((rowStart) => (
          <div className="row" key={rowStart}>
            {board.slice(rowStart, rowStart + 3).map((value, i) => {
              const index = rowStart + i;
              return (
                <div key={index} className="boxes" onClick={() => toggle(index)}>
                  {value === "x" && <img src={cross_icon} alt="X" />}
                  {value === "o" && <img src={circle_icon} alt="O" />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <button className="reset" onClick={reset}>Reset</button>
    </div>
  );
};

export default Tictactoe;

