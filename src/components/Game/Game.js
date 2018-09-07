import React, { Component } from 'react'
import './Game.css'
import WOW from 'wowjs'
import Acard from '../Acard/Acard'
import Qcard from '../Qcard/Qcard'

export default class Game extends Component {
  render() {

  //Initiate WOW on Render
  const wow = new WOW.WOW();
  wow.init();

    return (
      <div className="game">

        <div className="Qcard wow fadeInDown" data-wow-duration="0.4s">
          <Qcard/>
        </div>
        
        <div className="Acard">
            <Acard/>
        </div>

                </div>
           
        );
    }
}