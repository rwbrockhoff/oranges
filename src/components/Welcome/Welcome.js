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
                <p className="welcome-p">Get a group of friends from anywhere in the world. We suggest at least 4 players for maximum awesomeness.</p>
                <p className="welcome-p">Have one person create a game, and give your game a name. Everyone else can join the game by using the same name!</p>
                <p className="welcome-p">Gameplay is simple!</p>
                <p className="welcome-p">Each round a player is selected to be the judge and a card appears at the top of the screen. Everyone chooses which of their five cards best fits the top card. The judge picks the one they 
                like best, and the player who submitted that card wins the round!</p>
                <p className="welcome-p">The judge rotates each round, and the first to 5 points wins! </p>
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