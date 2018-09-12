import React from 'react'
import {Redirect} from 'react-router-dom'

export default function WinnerIs(){

   var queue;

    return(
        <div>
            And the winner is...
            {queue = window.setTimeout(function(){
      <Redirect to="/End-Game"/>
      },2000)}
        </div>
    )
}