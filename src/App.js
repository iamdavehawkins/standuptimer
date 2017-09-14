import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Timer from './Timer.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Timer minutes='0' seconds='2'/>
      </div>
    );
  }
}

export default App;
