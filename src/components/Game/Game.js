import React, { Component } from 'react'
import './Game.css'
import WOW from 'wowjs'
import Acard from '../Acard/Acard'
import Qcard from '../Qcard/Qcard'
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGavel } from '@fortawesome/free-solid-svg-icons'

library.add(faGavel)

class Game extends Component {
  constructor(){
    super()
    this.state = {
      judge: false
    }
  }

  componentDidMount(){
    let judge = this.props.users.filter(player => {
      return player.judge === true
    })
   
    if(judge[0].user === this.props.user.user){
      this.setState({
        judge: true
      })
    }
  }

  render() {

  //Initiate WOW on Render
  const wow = new WOW.WOW();
  wow.init();

    return (
      <div className="game">

        <div className="Qcard wow fadeInDown" data-wow-duration="0.4s">
          <Qcard/>
        </div>
        {this.state.judge === true ? 
        <div className="judge-div">
        <h1>You're the judge this round!</h1>
        <i class="judge fas fa-gavel"/>
        </div>
        : ''
        }
        <div className="Acard">
            <Acard/>
        </div>

                </div>
           
        );
    }
}
function mapStateToProps(state){
  return{
    ...this.props, ...state
  }
}


export default connect(mapStateToProps)(Game)