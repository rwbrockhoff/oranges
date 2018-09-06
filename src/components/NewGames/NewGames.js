import React, { Component } from 'react'
import {connect} from 'react-redux';
import {addPlayer, storeUser, readyPlayer} from '../../ducks/reducer'
import io from 'socket.io-client'
import './NewGames.css'

const socket = io.connect('http://localhost:3020')

class NewGames extends Component {
    constructor(){
        super()
        this.state = {
            input: '',
            roomId: null,
            players: []
        }

        socket.on('user-added', data =>{
          let tempArr = this.props.users.slice(0)
          tempArr.push(data)
          console.log(tempArr)
          this.props.addPlayer(tempArr)
        })


        socket.on('new-player', data =>{
        })

        socket.on('get-me-players', ()=>{
          if(this.props.users[0]) {
            console.log(this.props.users, "users being sent?")
            socket.emit('here-are-players', {players: this.props.users})
          }
        })

        socket.on('ready-player-added', data => {
          // console.log('readyplayers', data)
          this.props.readyPlayer(data)
        })

        socket.on('readied-players', () => {
          socket.emit('readyPlayers-array', {players: this.props.readyPlayers, room: this.props.room})
        })



    }
    componentDidMount(props){
      this.setState({
        roomId: this.props.room,
        players: this.props.users
      })
      socket.emit('join-room', {room:this.props.room})

      socket.on('add-players', data => {
        console.log(data, 'its the data')
        console.log(data.data.players, 'testy')
        this.props.addPlayer(data.data.players)
      })
      socket.emit('receive-ready-players', {room: this.props.room})
      socket.on('here-are-readyPlayers', data => {
        // console.log('readied player', data)
        this.props.readyPlayer(data)
      })

    }
    



    createUser(){
      // console.log(this.state.input)
      let names = this.props.users.map(element => {
        return element.user
      })
      if(names.indexOf(this.state.input) === -1){
        socket.emit('add-user', {userName: this.state.input, room:this.props.room})
        this.props.storeUser({user: this.state.input})
      } else {
        alert('already used ya idiot')
      }
    }

    async readyClick(){
      let copyReady = this.props.readyPlayers.slice(0);
      copyReady.push(this.props.user)
      await this.props.readyPlayer(copyReady)
      socket.emit('ready-player', {players: this.props.readyPlayers, room:this.props.room})
    }

  render(props) {
    return (
      <div className="newgames">
        <div className="roomid">
        <h1>Room ID: {this.state.roomId}</h1>
        </div>
        {/* When we pull in users, we'll want to map over that array here instead of a static set of divs. Just for visual example. Please use classnames to maintain styling.  */}
        <div className="userbox">
        {this.props.users.map(element=>{
          return(
            <div className="userbubble">
              {element.user}
            </div>
          )
        })}
        
        </div>
        <div className="userinput">
        <input onChange={(e) => this.setState({input: e.target.value})}/>
        <button onClick={()=>this.createUser()}className="green">Join Game</button>
        </div>
        <div className="footer">
        <button className="ready g" onClick={() => this.readyClick()} >Ready?</button>
        <button className="ready r">Cancel</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    room: state.room,
    users: state.users,
    user: state.user,
    readyPlayers: state.readyPlayers
  }
}
export default connect(mapStateToProps, {addPlayer, storeUser, readyPlayer})(NewGames);
