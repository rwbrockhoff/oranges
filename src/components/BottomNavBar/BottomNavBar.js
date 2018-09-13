import React, { Component } from 'react'
import './BottomNavBar.css'
import {connect} from 'react-redux';
import {storeUser} from '../../ducks/reducer'
import {Link} from 'react-router-dom'


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

    if(prevProps.users !== this.props.users){
     
      let currentUser = this.props.users.filter((e, i) => {
        if (e.user === this.props.user.user){
          this.setState({index: i})
        }
        return e.user === this.props.user.user
      })
      
      
      
      

    }

   
    
  }

  

  render() {
    console.log('sea otters', this.state.index)
      
    
    return (
      <div className='container'>
          
        <div className='bottomNav'>

        <div className='sectionOne'>

        
        <div className="main-image-div">
            <div className="stem-new"></div>
            <div className="leaf1-new"></div>
            <div className="leaf2-new"></div>
            <div className="image-div">
        {this.props.users[this.state.index] && <img className='userImage' src={this.props.users[this.state.index].userPic} />}
        </div>
        </div> 
        
     
        <Link to="/">
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


export default connect(mapStateToProps, {storeUser})(BottomNavBar)
