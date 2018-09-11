import React, { Component } from 'react'
import './BottomNavBar.css'
import {connect} from 'react-redux';


class BottomNavBar extends Component {
  render() {
    return (
      <div className='container'>
          
        <div className='bottomNav'>

        <div className='sectionOne'>
        <img className='userImage' src={this.props.user.userPic} />
        <i className="fas fa-home"/>
        <p>Home</p>
        <h4 className='score' >{this.props.user.score}</h4>
        </div>

        </div>
            
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    user: state.user
  }
}


export default connect(mapStateToProps)(BottomNavBar)
