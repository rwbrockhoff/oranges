import React, { Component } from 'react'
import './Endgame.css'
import {connect} from 'react-redux';

class Endgame extends Component {
  render() {
    let displayUsers = this.props.users.map((e,i) => {
      return(
        <div className='newgames'>
        <div className='userbubble' key={i}>
          <img className='userEndImage' src={e.userPic} />
          <h2>{e.user}</h2>
          <h4 className='endscore'>{e.score}</h4>
        </div>
        </div>
      )
    })
    return (
      <div className="endgame">
        {displayUsers}
        {/* <div className="winner">
        <div className="winnerbox">
        </div>
        </div> */}
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    users: state.users
  }
}


export default connect(mapStateToProps)(Endgame)
