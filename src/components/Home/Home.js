import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Home.css'
import WOW from 'wowjs'


export default class Home extends Component {
  render() {
    //Initiate WOW on Render
  const wow = new WOW.WOW();
  wow.init();

    return (
      <div className="home">
        <div className="logo">
        <h1>oranges to oranges </h1>
        </div>

        <div className="homebox wow fadeInRight">
        <Link to="/Create-Room"><center><button className='green'>New Game</button></center></Link>
        </div>

        <div className="homebox wow fadeInLeft">
        <Link to="/Join-Game" ><center><button className='green'>Join Game</button></center></Link>
        </div>
      </div>
    );
  }
}
