import React, { Component } from 'react'
import './CreateRoom.css'
import io from 'socket.io-client'
import {Redirect} from 'react-router-dom'
import {addRoom} from '../../ducks/reducer';
import {connect} from 'react-redux';
import axios from 'axios'

const socket = io.connect('http://localhost:3020')

class CreateRoom extends Component {
    constructor(){
        super()
        this.state = {
            input: '',
            toGameRoom: false
        }
        socket.on('new-player', data => {
          console.log(data.message)
          this.setState({
            toGameRoom: true
          })
        })
    }

    createGame(){
      axios.get(`/api/checkroom/${this.state.input}`)
      .then(res => {
        console.log(res)
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
          alert('room already taken')
        }
      })

    }

  render() {
    return (
        <div class='createRoom'>
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
