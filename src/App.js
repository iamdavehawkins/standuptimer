import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Timer from './Timer.js';
require('./App.css');

const appStyle = {
  height: '100%'
}

class App extends Component {
  render() {
    return (
      <div className="App" style={ appStyle }>
        <Timer minutes='0' seconds='2'/>
      </div>
    );
  }
}

export default App;
