import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVolumeUp, faVolumeOff } from '@fortawesome/free-solid-svg-icons'
import {logMusic} from '../../ducks/reducer'
import {connect} from 'react-redux';
import WOW from 'wowjs'

library.add(faVolumeUp, faVolumeOff)

class Speaker extends Component{

  componentDidMount(){
    const wow = new WOW.WOW();
    wow.init();
  }


    toggleMusic(){
        this.props.logMusic()
      }

    render(){
    return (
        <div className="wow fadeIn" data-wow-duration="1s">
    {this.props.music === true ? 
      <FontAwesomeIcon onClick={()=>this.toggleMusic()} className="volume-icon" size='2x' icon={faVolumeUp} color="white" />
      :
      <FontAwesomeIcon onClick={()=>this.toggleMusic()} className="volume-icon" size='2x' icon={faVolumeOff} color="white" style={{marginRight: "19px"}}/>
    }
        </div>
    )
}
}
function mapStateToProps(state){
    return {
      ...this.props, ...state
    }
  }
  
  export default connect(mapStateToProps, {logMusic})(Speaker);