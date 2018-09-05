import React, { Component } from 'react'
import './Game.css'

export default class Game extends Component {
  render() {
    return (
      <div className="game">

        <div className="Qcard">
          {/* Import Q Card Component */}
        </div>
        <div className="border"></div>

        <div className="Acard">
            {/* Import A Card Component */}
        </div>

      </div>
    )
  }
}
