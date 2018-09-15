import React, { Component } from 'react'
import './BottomNavBar.css'
import {connect} from 'react-redux';
import {storeUser, addPlayer} from '../../ducks/reducer'
import {Link} from 'react-router-dom'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3020')

class BottomNavBar extends Component {
  constructor(){
    super()
    this.state = {
      score: 0,
      index: 0
      
    }
 
  }

  // componentDidMount(){
  //   let currentUser = this.props.users.filter(e => {
  //     return e.user === this.props.user.user
  //   })
  //   this.props.storeUser(currentUser)
  // }

  componentDidUpdate(prevProps){
    socket.emit('join-room-generic', {room: this.props.room})

    if(prevProps.users !== this.props.users){
     
      let currentUser = this.props.users.filter((e, i) => {
        if (e.user === this.props.user.user){
          this.setState({index: i})
        }
        return e.user === this.props.user.user
      })
    }  
  }

  leaveRoom(){
    let tempArr = this.props.users.slice(0)
    let filteredArr = tempArr.filter(user => {
      return user.user !== this.props.user.user
    })
    socket.emit('leaving-room', {room: this.props.room, users: filteredArr})
    this.props.storeUser({user: "default", userPic: "https://api.adorable.io/avatars/50/a.png", judge: false, score: 0})
  }

  

  render() {
    console.log('sea otters', this.state.index)
      
    
    return (
      <div className='container'>
          
        <div className='bottomNav'>

        <div className='sectionOne'>

        {this.props.user.user === 'default' ? '' :
        <div className="main-image-div">
            <div className="stem-new"></div>
            <div className="leaf1-new"></div>
            <div className="leaf2-new"></div>
            <div className="image-div">
        {this.props.users[this.state.index] && <img className='userImage' src={this.props.users[this.state.index].userPic} />}
        </div>
        </div> 
        }
        
     
        <Link onClick={()=>this.leaveRoom()} to="/">
        <div className="home-button">
        <i className="fas fa-home"/>
        <p>Home</p>
        </div>
        </Link>
        
        {this.props.users[this.state.index] && <h4 className='score' >{this.props.users[this.state.index].score}</h4>}
    
        </div>

        </div>
            
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    ...this.props, ...state
  }
}


export default connect(mapStateToProps, {storeUser, addPlayer})(BottomNavBar)
