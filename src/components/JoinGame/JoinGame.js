import React, { Component } from 'react'
import './JoinGame.css'
import {addRoom} from '../../ducks/reducer';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import {Redirect} from 'react-router-dom';

const socket = io.connect('http://localhost:3020')

class JoinGame extends Component {
    constructor(){
        super()
        this.state = {
            input: '',
            toGameRoom: false
        }
    }

    joinGame(){
      socket.emit('join-room', {room: this.state.input})
      this.props.addRoom({room: this.state.input})
      this.setState({
        toGameRoom: true
      })
    }

  render() {
    return (
      <div class='App'>
        <div className="box">
        <input placeholder='Game ID' onChange={(e) => this.setState({input: e.target.value})}/>
        <button onClick={()=>this.joinGame()} className='green'>Join Game</button>
        </div>
        {this.state.toGameRoom ? <Redirect to="/New-Game"/> : ''}
      </div>
    )
  }
}

export default connect(null, {addRoom})(JoinGame);
