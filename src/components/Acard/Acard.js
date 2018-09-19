import React, { Component } from 'react';
import './Acard.css';
import axios from 'axios';
import {storeACard, updateSCard, updateACards, addPlayer, addWinningCard} from '../../ducks/reducer'
import {connect} from 'react-redux'
import Coverflow from 'react-coverflow';
import { StyleRoot } from 'radium';
import swal from 'sweetalert2';
import io from 'socket.io-client';
import {Redirect} from 'react-router-dom'

const socket = io.connect('https://server.aktlist.com')

class Acard extends Component {
    constructor(){
        super()
        this.state = {
            toWaiting: false,
            toPending: false
        }
    
        socket.on('total-scards', data => {
            this.props.updateSCard(data)
        })

        socket.on('updated-users', data => {
            this.props.addPlayer(data.users)
            this.props.addWinningCard(data.winner[0])
            this.setState({
                toWaiting: true
            })
        })
    }

    componentDidMount(){
        
        socket.emit('join-room-generic', {room:this.props.room})
        this.props.updateSCard([])

        
        if(this.props.aCards.length < 5){
            axios.post('https://server.aktlist.com/api/getacard', {numOfCards: 5 - this.props.aCards.length }).then(results => {
            
                let tempArray = this.props.aCards.slice(0).concat(results.data)
                this.props.storeACard(tempArray);
            })
        }
        
       var middle = document.getElementsByClassName('3')
       
    }

    arrayGet(){

        var userArray = this.props.users;
        
            var temp = userArray.filter((e,i) => {
                return e.judge===true
            })
            return temp
    }
    submitAnswer(card){
        if(this.props.aCards.length === 5){
            swal({
                title: "Submit card?",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Send Away!'
            }).then((res)=>{
                if(res.value === true){
                    let chosenCard = this.props.aCards.filter(myCards=>{
                        return myCards[0].id === card
                    })
                    let finalCard = chosenCard[0]
                    finalCard[0].user = this.props.user.user
                    let tempArr = this.props.sCards.slice(0)
                    tempArr.push(finalCard[0])
                    this.props.updateSCard(tempArr)
                    socket.emit('added-scard', {sCards: this.props.sCards, room: this.props.room})
                    let newArr = this.props.aCards.filter(myCards => {
                        return myCards[0].id !== card
                    })
                    this.props.updateACards(newArr)
                    this.setState({toPending: true})
                }
            })
        } else {
            swal({
                title: "One try is all you get!",
                type: 'error',
                text: 'Better luck next time.'
            })
        }

    }

    pickWinner(card){
        swal({
            title: "Submit card?",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Send Away!'
        }).then((res)=>{
            if(res.value === true){
                let winningCard = this.props.sCards.filter(theCard => {
                    return theCard.id === card
                })
                let usersCopy = this.props.users.map(e => {
                    if(e.user === winningCard[0].user){
                        e.score += 1
                    }
                    return e;
                })
                this.props.addPlayer(usersCopy)
                console.log(winningCard, 'judges winning card')
                socket.emit('user-with-points', {room: this.props.room, users: this.props.users, winner: winningCard})
            }})
    }

  render() {
    var dragging = false;

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        beforeChange: () => dragging = true,
        afterChange: () => dragging = false,
      };

      let displayACards = this.props.aCards.map((e,i) => {
          return(

              <div onClick={()=>this.submitAnswer(e[0].id)} class={i} key={e[0].id} id='Acards' 
              role="menuitem"
              tabIndex={i}>
                <h2>{e[0].name}</h2>
            
                <h4>{e[0].description}</h4>
                
              </div>
          )
      })
      let displayAnswers = this.props.sCards.map((e, i) => {
          return (
              <div onClick={() => this.pickWinner(e.id)} key={e.id} id='Acards' role='menuitem'
              tabIndex={i}>
              <h2>{e.name}</h2>
                <h4>{e.description}</h4>
              </div>
          )
      })
      let displayView = () => {
        let obj = this.arrayGet()
       
        if (obj[0].user === this.props.user.user){
            return displayAnswers
        }

        else {
            return displayACards
        }


      }

      

    return (
      <div className='Acard-App'>

          <div className="slider">
                {displayView()}
         </div>
                    
        {this.state.toWaiting ? <Redirect to="/End-Game"/> : ''}
        {this.state.toPending ? <Redirect to="/Pending"/> : ''}
      </div>
    )
  }
}

function mapStateToProps(state){
    return {
        ...this.props, ...state
    }
}


export default connect(mapStateToProps, {storeACard, updateSCard, updateACards, addPlayer, addWinningCard})(Acard)
