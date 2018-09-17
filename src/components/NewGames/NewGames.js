import React, { Component } from 'react'
import {connect} from 'react-redux';
import {addPlayer, storeUser, readyPlayer} from '../../ducks/reducer'
import io from 'socket.io-client'
import WOW from 'wowjs'
import './NewGames.css'
import {Redirect, Link} from 'react-router-dom';
import { notDeepEqual } from 'assert';
import buttonClick from '../Music/Sounds/buttonClick.mp3'
import Speaker from '../Speaker/Speaker'
import { Textfit } from 'react-textfit'

const socket = io.connect('http://localhost:3020')

class NewGames extends Component {
    constructor(){
        super()
        this.state = {
            input: '',
            pictureInput: '',
            roomId: null,
            players: [],
            toLoading: false,
            userNameSubmit: false,
            cancelGame: false
        }

        this.poppingUrl = buttonClick
        this.buttonAudio = new Audio(this.poppingUrl)

        socket.on('user-added', data =>{
          let tempArr = this.props.users.slice(0)
          tempArr.push(data)
          this.props.addPlayer(tempArr)
        })


        socket.on('new-player', data =>{
        })

        socket.on('get-me-players', ()=>{
          if(this.props.users[0]) {
            socket.emit('here-are-players', {players: this.props.users, room: this.props.room})
          }
        })

        socket.on('ready-player-added', data => {

          this.props.readyPlayer(data)
        })

        socket.on('readied-players', () => {
          socket.emit('readyPlayers-array', {players: this.props.readyPlayers, room: this.props.room})
        })

        socket.on('add-players', data => {
          this.props.addPlayer(data.data.players)
        })

        socket.on('here-are-readyPlayers', data => {
          this.props.readyPlayer(data)
        })

        socket.on('removed-players', data => {
          this.props.addPlayer(data)
        })



    }
    componentDidMount(props){

      this.setState({
        roomId: this.props.room,
        players: this.props.users
      })
      socket.emit('join-room', {room:this.props.room})

      socket.emit('receive-ready-players', {room: this.props.room})

    }
    
    createUser(){
      this.buttonAudio.play()
      let names = this.props.users.map(element => {
        return element.user
      })
      if(names.indexOf(this.state.input) === -1){
        socket.emit('add-user', {userName: this.state.input, userPic: `https://api.adorable.io/avatars/50/${this.state.pictureInput}.png`, room:this.props.room, score: 0})
        this.props.storeUser({user: this.state.input, userPic: `https://api.adorable.io/avatars/50/${this.state.pictureInput}.png`, judge: false, score: 0})
        this.setState({userNameSubmit: true})
      } else {
        alert('already used ya idiot')
      }
    }

    async readyClick(){
      
      let copyReady = this.props.readyPlayers.slice(0);
      copyReady.push(this.props.user)
      await this.props.readyPlayer(copyReady)
      socket.emit('ready-player', {players: this.props.readyPlayers, room:this.props.room})
      setTimeout(() => {
        this.setState({toLoading: true})
      }, 1000)
    }

    cancelGame = () => {
      this.setState({cancelGame: true})

      // If user submitted userName, but cancelled game--we need to
      // remove them from readyPlayers on cancel.

    }

  render(props) {
    <audio preload="auto" src="/static/media/buttonClick.9ce4170e.mp3"></audio>
    //Initiate WOW on Render
    const wow = new WOW.WOW();
     wow.init();

    var userInputReady = () => {
      // If they haven't submitted a userName, render Input box.
      if (!this.state.userNameSubmit){
        return (
        <div className="userinput">
        <input onChange={(e) => this.setState({input: e.target.value, pictureInput: e.target.value})}/>
        <button onClick={()=>this.createUser()}className="green">Join Game</button>
        </div>
        )}

      // If they submitted userName, render a ready message.
      else if (this.state.userNameSubmit && this.props.users.length > 2) {
        return (
          <div className="readymessage wow fadeInUp">
        <h2 className="readyMessage">Ready up when everyone is here!</h2>
        </div>
        )
      }
      else if(this.state.userNameSubmit){
        return(
        <div className="readymessage wow fadeInUp">
        <h2 className="readyMessage">Waiting for more players</h2>
        </div>
        )
      }
    }

    var userButtonReady = () => {
      if (this.state.userNameSubmit && this.props.users.length > 1){
        return (
        <button className="ready g" onClick={() => this.readyClick()} >Ready?</button>
        )
      }
      
    }

  
    return (
      <div className="newgames">
      <Speaker />
      {/* <audio muted src={this.props.musicClass}></audio> */}
        <div className="roomid">
        <Textfit>
        <h1>Room ID: {this.state.roomId}</h1>
        </Textfit>
        </div>
        {/* When we pull in users, we'll want to map over that array here instead of a static set of divs. Just for visual example. Please use classnames to maintain styling.  */}
        <div className="userbox">
        {this.props.users.map(element=>{
          console.log('elementuser',element)
          return(
            <div className="userbubble">
            <div className="main-image-div">
            <div className="stem-new"></div>
            <div className="leaf1-new"></div>
            <div className="leaf2-new"></div>
            <div className="image-div">
              <img className='userImage' src={element.userPic} />
              </div>
              </div>
              {element.user}
            </div>
          )
        })}
        
        </div>
        
        
        {/* Running conditional render for userInput */}
        {userInputReady()}
      
        {/* <div className="footer"> */}
        {userButtonReady()}
        {/* </div> */}
        {this.state.toLoading ? <Redirect to='/loading' /> : ''}
        {this.state.cancelGame ? <Redirect to='/' /> : ''}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    room: state.room,
    users: state.users,
    user: state.user,
    readyPlayers: state.readyPlayers,
    musicClass: state.musicClass
  }
}
export default connect(mapStateToProps, {addPlayer, storeUser, readyPlayer})(NewGames);
