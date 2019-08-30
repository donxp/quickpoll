import React from 'react';
import './App.css';
import PollCreate from './components/PollCreate'

function App() {
  return (
    <div className="app">
      <header>
        Quick Poll
        <div className="subheader">
          Create real-time polls in seconds!
        </div>
      </header>
      <PollCreate />
    </div>
  );
}

export default App;
