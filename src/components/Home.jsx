import React from 'react';

function Home({ onSelectMode }) {
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div>
        <button onClick={() => onSelectMode('cpu')}>Player vs AI</button>
        <button onClick={() => onSelectMode('pvp')}>Player vs Player</button>
      

      </div>
    </div>
  );
}

export default Home;
