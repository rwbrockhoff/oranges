import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Home.css'
import WOW from 'wowjs'
import popping from '../Music/Sounds/Oranges.mp3'
import buttonClick from '../Music/Sounds/buttonClick.mp3'
import Sound from 'react-sound'
import {logMusic} from '../../ducks/reducer'
import {connect} from 'react-redux';
import Speaker from '../Speaker/Speaker'



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

  componentWillUnmount(){
    window.clearTimeout(this.orangeTimer)
    this.poppingAudio.play()
    // if(this.state.playbackFailed=== false){
    //   this.props.logMusic()
    //   console.log(this.poppingAudio.src)
    //   console.log(this.poppingAudio)
    // }
  }

  shouldComponentUpdate(){
    return false
  }

  render(props) {
    //Initiate WOW on Render
  const wow = new WOW.WOW();
  wow.init();

    return (
      <div className="black-fade">
      <audio ref='audio-tag' src={popping} autoPlay />
      <div className="home">
      <Speaker/>
        
          <img className="logoicon" src={require("../../assets/logo.png")}/>
        

        <div className="homebox wow fadeInRight"  data-wow-delay="4.5s"  data-wow-duration="1s">
        <Link to="/Create-Room" ><center><button className='green'>New Game</button></center></Link>
        </div>

        <div className="homebox wow fadeInLeft"  data-wow-delay="4.5s"  data-wow-duration="1s">
        <Link to="/Join-Game" ><center><button className='green'>Join Game</button></center></Link>
        </div>
        <div class="image-area">
        <img id="cloud1" src={require("../../assets/clouds.png")}/>
        <img id="cloud2" src={require("../../assets/clouds.png")}/>
        <img id="cloud3" src={require("../../assets/clouds.png")}/>
        <img id="cloud4" src={require("../../assets/clouds.png")}/>
        <div id="front-hill"></div>
        <div id="middle-hill"></div>
        <div id="back-hill"></div>
        <div class="orange" id="o1"><div class="orange-color"></div><div class="orange-orange-color"></div></div>
        <div class="orange" id="o2"><div class="orange-color"></div><div class="orange-orange-color"></div></div>
        <div class="orange" id="o3"><div class="orange-color"></div><div class="orange-orange-color"></div></div>
        <div class="orange" id="o4"><div class="orange-color"></div><div class="orange-orange-color"></div></div>
        <div class="orange" id="o5"><div class="orange-color"></div><div class="orange-orange-color"></div></div>
        <div id="tree-wrapper">
                <div class="tree tree1">
                  <div class="branch1 branch"></div>
                  <div class="branch2 branch">
                    <div class="leaf"></div>
                    <div class="leaf1"></div>
                    <div class="leaf2"></div>
                  </div>
                  <div class="branch3 branch">
                    <div class="leaf"></div>
                    <div class="leaf1"></div>
                    <div class="leaf2"></div>
                  </div>
                  <div class="branch4 branch">
                    <div class="leaf"></div>
                    <div class="leaf1"></div>
                    <div class="leaf2"></div>
                  </div>
                  <div class="branch5 branch">
                    <div class="leaf"></div>
                    <div class="leaf1"></div>
                    <div class="leaf2"></div>
                  </div>
                  <div class="branch6 branch">
                    <div class="leaf"></div>
                    <div class="leaf1"></div>
                    <div class="leaf2"></div>
                  </div>
                  <div class="branch7 branch">
                    <div class="leaf"></div>
                    <div class="leaf1"></div>
                    <div class="leaf2"></div>
                  </div>
                  <div class="branch8 branch">
                    <div class="leaf"></div>
                    <div class="leaf1"></div>
                    <div class="leaf2"></div>
                  </div>
                  <div class="branch9 branch">
                    <div class="leaf"></div>
                    <div class="leaf1"></div>
                    <div class="leaf2"></div>
                  </div>
                  <div class="branch10 branch">
                    <div class="leaf"></div>
                    <div class="leaf1"></div>
                    <div class="leaf2"></div>
                  </div>
                  <div class="branch11 branch">
                    <div class="leaf"></div>
                    <div class="leaf1"></div>
                    <div class="leaf2"></div>
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

export default connect(mapStateToProps, {logMusic})(Home);
