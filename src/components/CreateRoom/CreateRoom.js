import React, { Component } from 'react'
import './CreateRoom.css'
import io from 'socket.io-client'
import {Redirect} from 'react-router-dom'
import {addRoom} from '../../ducks/reducer';
import {connect} from 'react-redux';
import axios from 'axios'
import buttonClick from '../Music/Sounds/buttonClick.mp3'
import Speaker from '../Speaker/Speaker'
import swal from 'sweetalert2'

const socket = io.connect('http://localhost:3020')

class CreateRoom extends Component {
    constructor(){
        super()
        this.state = {
            input: '',
            toGameRoom: false
        }
        this.poppingUrl = buttonClick
        this.buttonAudio = new Audio(this.poppingUrl)

        socket.on('new-player', data => {
          this.setState({
            toGameRoom: true
          })
        })
    }

    createGame(){
      this.buttonAudio.play()
      axios.get(`/api/checkroom/${this.state.input}`)
      .then(res => {
        if(!res.data[0]){
          axios.post('/api/addroom', {room: this.state.input})
          .then(res =>{
            socket.emit('join-room', {room: this.state.input})
            this.props.addRoom({room: this.state.input})
            this.setState({
              toGameRoom: false
            })
          })
        } else {
          swal({
            type: 'error',
            title: 'Oops...',
            text: "Looks like that room is already taken!",
          })
        }
      })

    }

  render() {
    return (
        <div class='createRoom'>
        <Speaker />
        <div className="create-room-box">
        <input placeholder='New Game ID' onChange={(e) => this.setState({input: e.target.value})}/>
        <button onClick={()=>this.createGame()} className='green'>Create Game</button>
        </div>
        {this.state.toGameRoom ? <Redirect to="/New-Game"/> : ''}
      </div>
    )
  }
}


export default connect(null, {addRoom})(CreateRoom);
