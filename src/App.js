import React, { Component } from 'react';
import './reset.css'
import './App.css'
import Home from './components/Home/Home'
import MusicTheme from './components/MusicTheme/MusicTheme'

class App extends Component {
  render() {
    return (
      <div className="App">
        <MusicTheme />
        <Home />
      </div>
    );
  }
}

export default App;
