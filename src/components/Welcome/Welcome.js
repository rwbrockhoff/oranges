import React, {Component} from 'react'
import './Welcome.css'
import {Redirect} from 'react-router-dom'
import buttonClick from '../Music/Sounds/buttonClick.mp3'

export default class Welcome extends Component{
    constructor(){
        super()
        this.state = {
            toHome: false
        }

        this.poppingUrl = buttonClick
        this.poppingAudio = new Audio(this.poppingUrl)
    }


    letsPlay(){
        this.poppingAudio.volume = 0.3
        this.poppingAudio.play()
        let header = document.getElementById('pointless1')
        header.id = "fade1"
        let contentDiv = document.getElementById('pointless2')
        contentDiv.id = "fade2"
        let goButton = document.getElementById('pointless3')
        goButton.id = "fade3"
        window.setTimeout(()=>{
            this.setState({
                toHome: true
            })
        },1200)

    }


    render(){
        return(
            <div className="welcome-main">
                {/* <h1 id="pointless1">Welcome to Oranges to Oranges!</h1> */}
                <img className="logoicon" id="pointless1" src={require("../../assets/logo.png")}/>
                <div className="welcome-content" id="pointless2">
                <h2 className="welcome-h2">How to Play:</h2>
                <p className="welcome-p">Get a group of people anywhere in the world. We'd suggest a minimum of 4 but do whatever you want.</p>
                <p className="welcome-p">Have one person create a room - everyone else will join the room they create</p>
                <p className="welcome-p">Pick a name, ready up, and play!</p>
                <p className="welcome-p">The judge will be randomly selected and rotate each round - it's the judges job to pick the card they think goes best with the card at the top of your screen.</p>
                <p className="welcome-p">Everyone else, submit a card you think the judge is likely to pick to rack up the points. First one to five wins! </p>
                </div>
                <button className='green welcome-button' id="pointless3" onClick={()=>this.letsPlay()}>Let's Go!</button>
                {this.state.toHome ? <Redirect to="/home"/>: ''}
                <div class="image-area">
        <div id="front-hill"></div>
        <div id="middle-hill"></div>
        <div id="back-hill"></div>
                </div>
                  </div>
        )
    }
}