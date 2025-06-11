import React from 'react';
import './Board.css';

function Board({ squares, onClick }) {
  return (
    <div className="board">
      {squares.map((val, i) => (
        <button
          key={i}
          onClick={() => onClick(i)}
          className={`square ${val ? 'animate-symbol' : ''}`}
        >
          {val}
        </button>
      ))}
    </div>
  );
}

export default Board;
