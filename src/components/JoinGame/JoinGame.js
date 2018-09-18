import React, { Component } from 'react'
import './JoinGame.css'
import {addRoom} from '../../ducks/reducer';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import buttonClick from '../Music/Sounds/buttonClick.mp3'
import Speaker from '../Speaker/Speaker'
import swal from 'sweetalert2'

const socket = io.connect('https://server.aktlist.com')

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
      axios.get(`https://server.aktlist.com/api/checkroom/${this.state.input}`)
      .then(res => {
        if(res.data[0] && res.data[0].open === true){
          socket.emit('join-room', {room: this.state.input})
          this.props.addRoom({room: this.state.input})
          this.setState({
            toGameRoom: true
          })
        } else if (res.data[0] && res.data[0].open === false){
          swal({
            type: 'error',
            text: "Game already in progress!",
          })
        } else {
          swal({
            type: 'error',
            title: 'Oops...',
            text: "We can't find that room!",
          })
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
