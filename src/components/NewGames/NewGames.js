import React, { Component } from 'react'
import './NewGames.css'

export default class NewGames extends Component {
    constructor(){
        super()
        this.state = {
            input: ''
        }
    }
  render() {
    return (
      <div className="newgames">
        <div className="roomid">
        <h1>Room ID: frolick</h1>
        </div>
        {/* When we pull in users, we'll want to map over that array here instead of a static set of divs. Just for visual example. Please use classnames to maintain styling.  */}
        <div className="userbox">
        <div className="userbubble">billyBob</div>
        <div className="userbubble">billyBob</div>
        <div className="userbubble">billyBob</div>
        <div className="userbubble">billyBob</div>
        <div className="userbubble">billyBob</div>
        
        </div>
        <div className="userinput">
        <input onChange={(e) => this.setState({input: e.target.value})}/>
        <button className="green">Join Game</button>
        </div>
        <div className="footer">
        <button className="ready g">Ready?</button>
        <button className="ready r">Cancel</button>
        </div>
      </div>
    )
  }
}
