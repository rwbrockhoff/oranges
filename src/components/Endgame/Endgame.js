import React, { Component } from 'react'
import './Endgame.css'
import {connect} from 'react-redux';
import {setJudge, updateJudge, updateQCard} from '../../ducks/reducer'
import _ from 'lodash';
import {Redirect} from 'react-router-dom'
import io from 'socket.io-client'
import axios from 'axios'
import WOW from 'wowjs'

const socket = io.connect('http://localhost:3020')

class Endgame extends Component {
  constructor(){
    super()
    this.state = {
      nextRound: false,
      winner: false,
      toHome: false
    }

    socket.on('lets-go-to-next-round', ()=>{
      this.props.updateQCard([])
      this.setState({
        nextRound: true
      })
    })

    socket.on('heres-your-next-judge', data => {
      this.props.setJudge(data)

      let nextJudge = data.filter(user => {
        return user.judge === true
      })
      
    })

    socket.on('lets-go-home', ()=>{
      this.setState({
        toHome: true
      })
    })
  }
  componentDidMount(){
    const wow = new WOW.WOW();
    wow.init();
    socket.emit('join-room-generic', {room:this.props.room})
    let winner = this.props.users.filter(user => {
      return user.score === 2
    })
    if(winner[0]){
      this.setState({
        winner: true
      })
    }
  }

  nextRound(){
    let usersArr = this.props.users.slice(0)
    usersArr[0].judge = false
    let shiftedGuy = usersArr.shift()
    usersArr.push(shiftedGuy)
    usersArr[0].judge = true
    socket.emit('next-judge', {users: usersArr, room: this.props.room})

    socket.emit('going-to-next-round', {room:this.props.room})
  }
  toHome(){
    axios.delete('/api/deleteroom', {roomName: this.props.room})
    .then(res => {
      socket.emit('to-home', {room: this.props.room})
    })
  }

  newGame(){
    let usersArr = this.props.users.slice(0)
    usersArr[0].judge = false
    let shiftedGuy = usersArr.shift()
    usersArr.push(shiftedGuy)
    usersArr[0].judge = true
    usersArr.forEach(user =>{
      user.score = 0
    })
    socket.emit('next-judge', {users: usersArr, room: this.props.room})
    socket.emit('going-to-next-round', {room:this.props.room})
  }

  render() {
    
    var scoreArray = _.sortBy(this.props.users, ['score']).reverse()
    
    var displayUsers = scoreArray.map((e,i) => {
      return(
        
        <div className='userbubble wow fadeIn' data-wow-delay="2.5s" data-wow-duration=".5s" key={i}>
        <div className="main-image-div">
          <div className="stem-new"></div>
          <div className="leaf1-new"></div>
          <div className="leaf2-new"></div>
          <div className="image-div">
          <img className='userImage' src={e.userPic} />
          </div>
          </div>
          <h2>{e.user}</h2>
          <h4 className='endscore'>{e.score}</h4>
        </div>
        
      )
    })
    return (
      <div className="endgame">
      {this.state.winner ? 
      <h1>{this.props.winningCard.user} wins the game!</h1> : 
      <div>
      <h1>{this.props.winningCard.user} wins the round</h1>
      {/* <h1>{this.props.winningCard.name}</h1> */}
      <div id="answerCard-endgame">
      <h2>{this.props.winningCard.name}</h2>
          <br />
          <h4>{this.props.winningCard.description}</h4>
      </div>
      </div>}
      <div className="endgame-users">
        {displayUsers}
      </div>
       {this.state.winner ? 
        <div>
        <button onClick={()=>this.newGame()} className="green">New Game</button>
        <button onClick={()=>this.toHome()}className="green">Exit</button>
        </div>
       : <button onClick={()=>this.nextRound()} className="green">Next Round</button>}
       {this.state.nextRound ? <Redirect to="/Game"/> : ''}
       {this.state.toHome ? <Redirect to="/home"/> : ''}
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    ...this.props, ...state
  }
}


export default connect(mapStateToProps, {setJudge, updateJudge, updateQCard})(Endgame)
