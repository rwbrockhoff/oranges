import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Home.css'


export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="logo">
        <h1>oranges to oranges </h1>
        </div>

        <div className="box">
        <Link to="/Create-Room"><button className='green'>New Game</button></Link>
        </div>

        <div className="box">
        <Link to="/Join-Game" ><button className='green'>Join Game</button></Link>
        </div>
      </div>
    );
  }
}
