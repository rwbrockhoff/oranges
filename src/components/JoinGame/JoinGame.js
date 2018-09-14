import React, { Component } from 'react'
import './JoinGame.css'
import {addRoom} from '../../ducks/reducer';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import buttonClick from '../Music/Sounds/buttonClick.mp3'
import Speaker from '../Speaker/Speaker'

const socket = io.connect('http://localhost:3020')

class JoinGame extends Component {
    constructor(){
        super()
        this.state = {
            input: '',
            toGameRoom: false
        }
        this.poppingUrl = buttonClick
        this.buttonAudio = new Audio(this.poppingUrl)
    }

    joinGame(){
      this.buttonAudio.play()
      axios.get(`/api/checkroom/${this.state.input}`)
      .then(res => {
        if(res.data[0] && res.data[0].open === true){
          socket.emit('join-room', {room: this.state.input})
          this.props.addRoom({room: this.state.input})
          this.setState({
            toGameRoom: true
          })
        } else if (res.data[0] && res.data[0].open === false){
          alert('game already in progress')
        } else {
          alert('game not found')
        }
      })

    }

  render() {
    return (
      <div class='App'>
      <Speaker />
        <div className="joinbox">
        <input placeholder='Game ID' onChange={(e) => this.setState({input: e.target.value})}/>
        <button onClick={()=>this.joinGame()} className='green'>Join Game</button>
        </div>
        {this.state.toGameRoom ? <Redirect to="/New-Game"/> : ''}
      </div>
    )
  }
}

export default connect(null, {addRoom})(JoinGame);
