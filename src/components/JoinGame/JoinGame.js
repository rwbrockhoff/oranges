import React, { Component } from 'react'
import './JoinGame.css'

export default class JoinGame extends Component {
    constructor(){
        super()
        this.state = {
            input: ''
        }
    }
  render() {
    return (
      <div class='App'>
        <div className="box">
        <input placeholder='Game ID' onChange={(e) => this.setState({input: e.target.value})}/>
        <button className='green'>Join Game</button>
        </div>
      </div>
    )
  }
}
