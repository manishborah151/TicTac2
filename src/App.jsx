import React, { useState } from 'react';
import Home from './components/Home.jsx';
import Game from './components/Game.jsx';
import './App.css';


function App() {
  const [mode, setMode] = useState(null);

  return (
    <div className="App">
      {!mode ? (
        <Home onSelectMode={setMode} />
      ) : (
        <Game mode={mode} onBack={() => setMode(null)} />
      )}
    </div>
  );
}

export default App;
