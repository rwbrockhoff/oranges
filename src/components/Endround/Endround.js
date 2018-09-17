import React, { Component } from 'react'
import './Endround.css'
import Qcard from '../Qcard/Qcard'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Endround extends Component {
  constructor(){
    super()
    this.state = {
      toNext: false
    }
  }

  componentDidMount(){
    window.setTimeout(()=>{
      this.setState({
        toNext:true
      })
    },3000)
  }
  render() {
    return (
      <div className="endround">

        <div className="leaderboard">
        <h1>{this.props.winningCard.user}</h1>
        <h1>wins the round!</h1>
        <h2>{this.props.winningCard.name}</h2>
        <h2>{this.props.winningCard.description}</h2>
        </div>
        {this.state.toNext ? <Redirect to="/End-Game" /> : ''}
      </div>
     
    )
  }
}
function mapStateToProps(state){
  return {
      ...this.props, ...state
  }
}

export default connect(mapStateToProps)(Endround)
