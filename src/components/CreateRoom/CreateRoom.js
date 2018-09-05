import React, { Component } from 'react'
import './CreateRoom.css'
export default class CreateRoom extends Component {
    constructor(){
        super()
        this.state = {
            input: ''
        }
    }
  render() {
    return (
        <div class='createRoom'>
        <div className="box">
        <input placeholder='New Game ID' onChange={(e) => this.setState({input: e.target.value})}/>
        <button className='green'>Create Game</button>
        </div>
      </div>
    )
  }
}
