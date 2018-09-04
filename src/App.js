import React, { Component } from 'react';
import './App.css';
import Home from './components/Home/Home'
import Qcard from './components/Qcard/Qcard';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Home/>
      </div>
    );
  }
}

export default App;
