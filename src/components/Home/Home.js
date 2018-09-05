import React, { Component } from 'react'
import './Home.css'
export default class Home extends Component {
  render() {
    return (
      <div class="home">
        <div className="logo">
        <h1>oranges to oranges </h1>
        </div>

        <div className="box">
        <button className='green'>New Game</button>
        </div>

        <div className="box">
        <button className='green'>Join Game</button>
        </div>
      </div>
    );
  }
}
