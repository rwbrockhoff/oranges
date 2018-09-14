import React, {Component} from 'react'
import opener from '../Music/Sounds/opener.mp3'
import {connect} from 'react-redux';

class MusicTheme extends Component{
    constructor(){
        super()

        this.openerUrl = opener
        this.openerAudio = new Audio(this.openerUrl)
    }

componentDidMount(){
    if(this.props.music === true){
        this.openerAudio.volume = 0.5
        this.openerAudio.loop = true
        this.openerAudio.play()
    }
}

componentDidUpdate(prevProps){
    if(prevProps.music !== this.props.music){
        if(this.props.music === false){
            this.openerAudio.volume = 0
        } else if(this.props.music === true){
            this.openerAudio.volume = 0.5
        }
    }
}

componentWillUnmount(){
    console.log('I am unmounting!!')
    this.openerAudio.pause()
}

    render(){
        return (
            <div></div>
        )
    }
}

function mapStateToProps(state){
    return {
      ...this.props, ...state
    }
  }
  
export default connect(mapStateToProps)(MusicTheme);