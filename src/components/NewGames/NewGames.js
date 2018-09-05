import React, { Component } from 'react'
import {connect} from 'react-redux';
import './NewGames.css'

class NewGames extends Component {
    constructor(){
        super()
        this.state = {
            input: '',
            roomId: null
        }
    }
    componentDidMount(props){
      this.setState({
        roomId: this.props.room
      })
    }
  render(props) {
    return (
      <div className="newgames">
        <div className="roomid">
        <h1>Room ID: {this.state.roomId}</h1>
        </div>
        {/* When we pull in users, we'll want to map over that array here instead of a static set of divs. Just for visual example. Please use classnames to maintain styling.  */}
        <div className="userbox">
        <div className="userbubble">billyBob</div>
        <div className="userbubble">billyBob</div>
        <div className="userbubble">billyBob</div>
        <div className="userbubble">billyBob</div>
        <div className="userbubble">billyBob</div>
        
        </div>
        <div className="userinput">
        <input onChange={(e) => this.setState({input: e.target.value})}/>
        <button className="green">Join Game</button>
        </div>
        <div className="footer">
        <button className="ready g">Ready?</button>
        <button className="ready r">Cancel</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    room: state.room
  }
}
export default connect(mapStateToProps)(NewGames);
