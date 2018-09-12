import React, { Component } from 'react'
import {connect} from 'react-redux';
import {addPlayer, storeUser, readyPlayer} from '../../ducks/reducer'
import io from 'socket.io-client'
import WOW from 'wowjs'
import { GridLoader } from 'react-spinners';
import './NewGames.css'
import {Redirect, Link} from 'react-router-dom';
import { notDeepEqual } from 'assert';

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
            cancelGame: false,
            readyMessage: 'Join when ready'
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
            socket.emit('here-are-players', {players: this.props.users, room: this.props.room})
          }
        })

        socket.on('ready-player-added', data => {
          // console.log('readyplayers', data)
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



    }
    componentDidMount(props){
      this.setState({
        roomId: this.props.room,
        players: this.props.users
      })
      socket.emit('join-room', {room:this.props.room})

      // socket.on('add-players', data => {
      //   this.props.addPlayer(data.data.players)
      // })
      socket.emit('receive-ready-players', {room: this.props.room})
      // socket.on('here-are-readyPlayers', data => {
      //   this.props.readyPlayer(data)
      // })

    }
    



    createUser(){
      
      let names = this.props.users.map(element => {
        return element.user
      })
      if(names.indexOf(this.state.input) === -1){
        socket.emit('add-user', {userName: this.state.input, userPic: `https://api.adorable.io/avatars/50/${this.state.pictureInput}.png`, room:this.props.room, score: 0})
        this.props.storeUser({user: this.state.input, userPic: `https://api.adorable.io/avatars/50/${this.state.pictureInput}.png`, judge: false, score: 0})
        this.setState({userNameSubmit: true})
      } 
      
      else {
        alert('already used ya idiot')
      }

    }

    async readyClick(){
      
      let copyReady = this.props.readyPlayers.slice(0);
      copyReady.push(this.props.user)
      await this.props.readyPlayer(copyReady)
      socket.emit('ready-player', {players: this.props.readyPlayers, room:this.props.room})
      this.setState({readyMessage: 'Loading...'})
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

    //Initiate WOW on Render
    const wow = new WOW.WOW();
     wow.init();

    var userInputReady = () => {
      // If they haven't submitted a userName, render Input box.
      if (!this.state.userNameSubmit){
        return (
        <div className="userinput">
        {/* <img src={`https://api.adorable.io/avatars/69/${this.state.pictureInput}.png`} /> */}
        <input onChange={(e) => this.setState({input: e.target.value, pictureInput: e.target.value})}/>
        <button onClick={()=>this.createUser()}className="green">Join Game</button>
        </div>
        )}

      // If they submitted userName, render a ready message.
      else if (this.state.userNameSubmit && this.props.users.length > 1) {
        return (
          <div className="readymessage wow fadeInUp">
        <h2 className="readyMessage">{this.state.readyMessage}</h2>
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
          <div>
        <button className="ready g" onClick={() => this.readyClick()} >Ready?</button>
        </div>
        )
      }
      
    }

  
    return (
      <div className="newgames">
        <div className="roomid">
        <h1>Room ID: {this.state.roomId}</h1>
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
      
        <div className="footer">
        {userButtonReady()}
        </div>
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
    readyPlayers: state.readyPlayers
  }
}
export default connect(mapStateToProps, {addPlayer, storeUser, readyPlayer})(NewGames);
