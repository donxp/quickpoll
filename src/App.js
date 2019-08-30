import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Index from './pages/Index'
import Vote from './pages/Vote'
import Results from './pages/Results'

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          Quick Poll
          <div className="subheader">
            Create real-time polls in seconds!
          </div>
        </header>
        <div className="container">
          <Route exact path="/" component={Index} />
          <Route exact path="/:id/r" component={Results} />
          <Route exact path="/:id" component={Vote} />
        </div>
      </div>
    </Router>
  );
}

export default App;
