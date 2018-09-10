import React, { Component } from 'react';
import axios from 'axios';
import {storeQCard, updateJudge, updateQCard} from '../../ducks/reducer';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import './Qcard.css';

const socket = io.connect('http://localhost:3020')

class Qcard extends Component {
    constructor(){
        super()
        socket.on('getQCard', data => {
            console.log('getting that', data)
            this.props.updateQCard(data)
        })
    }




    componentDidMount(){
        let userArray = this.props.users;
        var temp = userArray.filter((e,i) => {
            return e.judge===true
        })
        
        if (temp[0]){
            if (temp[0].user === this.props.user.user){
                alert('that is me!')

                axios.get('/api/getqcard').then(results => {
                    this.props.updateJudge(temp[0])
                    socket.emit('updateQCard', {qCard: results.data, room: this.props.room})
                })

            }
        }
        
        
    }


  render() {
  
      let displayQCard = this.props.qCard.map((e,i) => {
          return(
              <div className='qcard' key={i}>
                <h1>{e.name}</h1>
                <h3>{e.description}</h3>
              </div>
          )
      })
    return (
      <div>
          {displayQCard}
      </div>
    )
  }
}

function mapStateToProps(state){
    return {
        ...state, ...this.props
    }
}

export default connect(mapStateToProps, {storeQCard, updateJudge, updateQCard})(Qcard);