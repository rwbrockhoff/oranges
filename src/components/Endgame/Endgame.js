import React, { Component } from 'react'
import './Endgame.css'

export default class Endgame extends Component {
  render() {
    return (
      <div className="endgame">
        <div className="winner">
            <h1>Username</h1>
            <h2>WINS !!!</h2>
        <div className="winnerbox">
        </div>
        </div>
      </div>
    )
  }
}
