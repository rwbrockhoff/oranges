import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Home.css'
import WOW from 'wowjs'
import popping from '../Music/Sounds/Oranges.mp3'
import buttonClick from '../Music/Sounds/buttonClick.mp3'
import Sound from 'react-sound'
import {logMusic, addPlayer, addRoom} from '../../ducks/reducer'
import {connect} from 'react-redux';
import Speaker from '../Speaker/Speaker'
import io from 'socket.io-client'


const socket = io.connect('https://server.aktlist.com')


class Home extends Component {
  constructor(){
    super()
    this.state = {
      sound: true,
      playbackFailed: false
    }

    this.poppingUrl = buttonClick
    this.poppingAudio = new Audio(this.poppingUrl)
    
  }

  componentDidMount(){
    const wow = new WOW.WOW();
    wow.init();
    socket.emit('leaveAll')
    if(this.props.users[0]){
      //Dont like this but used to clear the sockets properly//
      window.location.reload()
    }
  }

  componentWillUnmount(){
    window.clearTimeout(this.orangeTimer)
    this.poppingAudio.play()
    this.props.addPlayer([])
    this.props.addRoom(' ')
  }

  shouldComponentUpdate(){
    return false
  }

  render(props) {
    //Initiate WOW on Render
 

    return (
      <div className="black-fade">
      <audio ref='audio-tag' src={popping} autoPlay />
      <div className="home">
      <Speaker/>
        
          <img className="logoicon wow fadeIn" data-wow-delay="4.5s" data-wow-duration="1s" src={require("../../assets/logo.png")}/>
        

        <div className="homebox wow fadeInRight"  data-wow-delay="4.5s"  data-wow-duration="1s">
        <Link to="/Create-Room" ><center><button className='green'>New Game</button></center></Link>
        </div>

        <div className="homebox wow fadeInLeft" data-wow-delay="4.5s"  data-wow-duration="1s">
        <Link to="/Join-Game" ><center><button className='green'>Join Game</button></center></Link>
        </div>
        <div className="image-area">
        <img id="cloud1" src={require("../../assets/clouds.png")}/>
        <img id="cloud2" src={require("../../assets/clouds.png")}/>
        <img id="cloud3" src={require("../../assets/clouds.png")}/>
        <img id="cloud4" src={require("../../assets/clouds.png")}/>
        <div id="front-hill"></div>
        <div id="middle-hill"></div>
        <div id="back-hill"></div>
        <div className="orange" id="o1"><div  className="orange-color"></div><div className="orange-orange-color"></div></div>
        <div className="orange" id="o2"><div className="orange-color"></div><div  className="orange-orange-color"></div></div>
        <div className="orange" id="o3"><div className="orange-color"></div><div className="orange-orange-color"></div></div>
        <div className="orange" id="o4"><div className="orange-color"></div><div className="orange-orange-color"></div></div>
        <div className="orange" id="o5"><div className="orange-color"></div><div className="orange-orange-color"></div></div>
        <div id="tree-wrapper">
                <div className="tree tree1">
                  <div className="branch1 branch"></div>
                  <div className="branch2 branch">
                    <div className="leaf"></div>
                    <div className="leaf1"></div>
                    <div className="leaf2"></div>
                  </div>
                  <div className="branch3 branch">
                    <div className="leaf"></div>
                    <div className="leaf1"></div>
                    <div className="leaf2"></div>
                  </div>
                  <div className="branch4 branch">
                    <div className="leaf"></div>
                    <div className="leaf1"></div>
                    <div className="leaf2"></div>
                  </div>
                  <div className="branch5 branch">
                    <div className="leaf"></div>
                    <div className="leaf1"></div>
                    <div className="leaf2"></div>
                  </div>
                  <div className="branch6 branch">
                    <div  className="leaf"></div>
                    <div className="leaf1"></div>
                    <div className="leaf2"></div>
                  </div>
                  <div className="branch7 branch">
                    <div className="leaf"></div>
                    <div className="leaf1"></div>
                    <div className="leaf2"></div>
                  </div>
                  <div className="branch8 branch">
                    <div className="leaf"></div>
                    <div className="leaf1"></div>
                    <div className="leaf2"></div>
                  </div>
                  <div className="branch9 branch">
                    <div className="leaf"></div>
                    <div className="leaf1"></div>
                    <div className="leaf2"></div>
                  </div>
                  <div className="branch10 branch">
                    <div className="leaf"></div>
                    <div className="leaf1"></div>
                    <div className="leaf2"></div>
                  </div>
                  <div className="branch11 branch">
                    <div className="leaf"></div>
                    <div className="leaf1"></div>
                    <div className="leaf2"></div>
                  </div>
                </div>
                  </div>
                </div>
                {this.orangeTimer = setTimeout(function(){
      document.getElementById('o5').id = 'o6'
      },4000)}
      </div>

      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    ...this.props, ...state
  }
}

export default connect(mapStateToProps, {logMusic, addPlayer, addRoom})(Home);
