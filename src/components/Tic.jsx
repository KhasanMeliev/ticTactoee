import React, { useEffect, useState } from "react";
import "./styles.css";

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Tic = () => {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isX, setIsX] = useState(true);
  const [status, setStatus] = useState("");

  const getWinner = (squares) => {
    const winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningPositions.length; i++) {
      const [x, y, z] = winningPositions[i];

      if (
        squares[x] &&
        squares[x] === squares[y] &&
        squares[x] === squares[z]
      ) {
        return squares[x];
      }
    }
    return null;
  };

  useEffect(() => {
    if (!getWinner(squares) && squares.every((item) => item !== "")) {
      setStatus("This is a draw! Please restart the game!");
    } else if (getWinner(squares)) {
      setStatus(
        `Winner is ${getWinner(
          squares
        )}. Please restart the game to play again.`
      );
    } else {
      setStatus(`Next turn is ${isX ? "X" : "O"}`);
    }
  }, [squares, isX]);

  const handleClick = (getCurrentSquare) => {
    let copySquares = [...squares];
    if (copySquares[getCurrentSquare]) return;
    copySquares[getCurrentSquare] = isX ? "X" : "O";

    setIsX(!isX);
    setSquares(copySquares);
  };

  const handleRestart = () => {
    setIsX(true);
    setSquares(Array(9).fill(""));
  };

  return (
    <div className="container">
      <div className="row">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="row">
        <Square value={squares[3]} onClick={() => handleClick(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="row">
        <Square value={squares[6]} onClick={() => handleClick(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} />
      </div>
      <h1>{status}</h1>
      <button onClick={handleRestart} className="restart">
        Restart
      </button>
    </div>
  );
};

export default Tic;
