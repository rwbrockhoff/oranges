import React, { Component } from 'react';
import axios from 'axios';
import {storeQCard} from '../../ducks/reducer';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import './Qcard.css';

const socket = io.connect('http://localhost:3020')


class Qcard extends Component {


    componentDidMount(){
        
        var test = this.arrayGet()
        console.log(test, 'test')
        // if (this.arrayGet()[0] === this.props.user.user){
        //     alert('The doggo!')
        //     this.setter()
        // }
    }

    // if (temp[0]){
    //     if (temp[0].user === this.props.user.user){
    //         alert('that is me!')
                
    //             // this.props.updateJudge(temp[0])
                
    //             socket.emit('updateQCard', {room: this.props.room})
            

    //     }
    // }


arrayGet(){

    var userArray = this.props.users;
    
        var temp = userArray.filter((e,i) => {
            return e.judge===true
        })
        return temp
}

setter = () => {
    axios.get('/api/getqcard').then(results => {
        this.props.storeQCard(results.data)
    }).then(() => {
        socket.emit('updateQCard', {room: this.props.room, qCard: this.props.qCard})
    })
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
        ...this.props, ...state
    }
}

export default connect(mapStateToProps, {storeQCard})(Qcard);