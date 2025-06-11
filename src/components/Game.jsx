import React, { useState, useEffect } from 'react';
import Board from './Board.jsx';
import { bestMove } from '../utils/ai.jsx';
import { playSound } from '../utils/sound';
import Confetti from './Confetti.jsx'; 




const initialBoard = Array(9).fill(null);

function Game({ mode, onBack }) {
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [playerWon, setPlayerWon] = useState(false);


  const currentPlayer = xIsNext ? 'X' : 'O';

  useEffect(() => {
    
    if (mode === 'cpu' && !xIsNext && !winner) {
      const timer = setTimeout(() => {
        const move = bestMove(board);
        if (move !== -1) {
          const newBoard = [...board];
          newBoard[move] = 'O';

          const winnerCheck = calculateWinner(newBoard);
          setBoard(newBoard); // Update board first

          if (winnerCheck) {
            setWinner(winnerCheck);

            if (winnerCheck === 'Draw') {
              playSound('draw');
            } else if (winnerCheck === 'O') {
              // CPU wins — play draw sound as requested
              playSound('draw');
            } else {
              playSound('win');
               setPlayerWon(false); // Reset before retriggering
    setTimeout(() => setPlayerWon(true), 50);
            }
          } else {
            playSound('click');
            setXIsNext(true);
          }
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [xIsNext, board, mode, winner]);

  const handleClick = (index) => {
    if (board[index] || winner || (mode === 'cpu' && !xIsNext)) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    playSound('click');

    const winnerCheck = calculateWinner(newBoard);
    if (winnerCheck) {
      setWinner(winnerCheck);

      if (winnerCheck === 'Draw') {
        playSound('draw');
      } else if (winnerCheck === 'X') {
        playSound('win');
    
            setPlayerWon(false); // Reset
    setTimeout(() => setPlayerWon(true), 50);
      } else {
        // O won by player-vs-player, still use draw sound as per CPU logic?
        playSound('win');
         setPlayerWon(false); // Reset
    setTimeout(() => setPlayerWon(true), 50);
      }
    } else {
      setXIsNext(!xIsNext);
    }
  };


  const resetGame = () => {
    setBoard(initialBoard);
    setXIsNext(true);
    setWinner(null);
    setPlayerWon(true);
    
  };

  return (
  
   

    <div className="game-container">
      
     <Confetti trigger={playerWon} />
     
      <h2>
  {winner
    ? winner === 'Draw'
      ? 'Draw'
      : mode === 'cpu'
        ? winner === 'X'
          ? 'Winner: Player'
          : 'Winner: AI'
        : `Winner: ${winner}`
    : `Next Player: ${currentPlayer}`}
</h2>

      <Board squares={board} onClick={handleClick} />
      <div className="button-group">
        <button onClick={resetGame} className={winner ? 'highlight' : ''}>Restart</button>
        <button onClick={onBack}>Back to Home</button>
      </div>
      

    </div>
  
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  if (!squares.includes(null)) return 'Draw';
  return null;
}

export default Game;
