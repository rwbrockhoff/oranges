import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Home.css'
import WOW from 'wowjs'


export default class Home extends Component {

  componentWillUnmount(){
    window.clearTimeout(this.orangeTimer)
  }

  render(props) {
    //Initiate WOW on Render
  const wow = new WOW.WOW();
  wow.init();

    return (
      <div className="black-fade">
      <div className="home">
        
          <img className="logoicon" src={require("../../assets/logo.png")}/>
        

        {/* data-wow-delay="4.5s" */}
        <div className="homebox wow fadeInRight"  data-wow-duration="1s">
        <Link to="/Create-Room"><center><button className='green'>New Game</button></center></Link>
        </div>

        <div className="homebox wow fadeInLeft"  data-wow-duration="1s">
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
                {this.orangeTimer = window.setTimeout(function(){
      document.getElementById('o5').id = 'o6'
      },4000)}
      </div>
      </div>
    );
  }
}
