import React, { Component } from 'react'
import './BottomNavBar.css'
import {connect} from 'react-redux';


class BottomNavBar extends Component {
  render() {
    return (
      <div className='container'>
          
        <div className='bottomNav'>

        <div className='sectionOne'>
        <div className="main-image-div">
            <div className="stem-new"></div>
            <div className="leaf1-new"></div>
            <div className="leaf2-new"></div>
            <div className="image-div">
        <img className='userImage' src={this.props.user.userPic} />
        </div>
        </div>
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
