import React, { Component } from 'react'
import './Endround.css'
import Qcard from '../Qcard/Qcard'

export default class Endround extends Component {
  render() {
    return (
      <div className="endround">
        <div className="Card">
        <Qcard/>
        </div>

        <div className="Card">
        <Qcard/>
        </div>

        <div className="leaderboard">
        <h1>User</h1>
        <h1>wins the round!</h1>
        <button className="green">Next Card</button>
        </div>
        
      </div>
     
    )
  }
}
