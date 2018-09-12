import React, { Component } from 'react'
import './BottomNavBar.css'
import {connect} from 'react-redux';
import {storeUser} from '../../ducks/reducer'


class BottomNavBar extends Component {
  constructor(){
    super()
    this.state = {
      score: 0
    }
  }

  // componentDidMount(){
  //   let currentUser = this.props.users.filter(e => {
  //     return e.user === this.props.user.user
  //   })
  //   this.props.storeUser(currentUser)
  // }

  // componentDidUpdate(prevProps){

  //   if(prevProps.users !== this.props.users){

  //     let currentUser = this.props.users.filter(e => {
  //       return e.user === this.props.user.user
  //     })
  //     console.log(currentUser)
  //     this.props.storeUser(currentUser)

  //   }
    
  // }

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
    ...this.props, ...state
  }
}


export default connect(mapStateToProps, {storeUser})(BottomNavBar)
