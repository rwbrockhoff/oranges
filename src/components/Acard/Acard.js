import React, { Component } from 'react';
import './Acard.css';
import axios from 'axios';
import {storeACard, updateSCard, updateACards} from '../../ducks/reducer'
import {connect} from 'react-redux'
import Coverflow from 'react-coverflow';
import { DotLoader } from 'react-spinners';
import { css } from 'react-emotion';
import { StyleRoot } from 'radium';
import swal from 'sweetalert2';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3020')

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    padding-top: 10px;
`;

class Acard extends Component {
    constructor(){
        super()
        this.state = {
            loading: true
        }
    
        socket.on('total-scards', data => {
            this.props.updateSCard(data)
        })
    }

    componentDidMount(){
        socket.emit('join-room-generic', {room:this.props.room})
        axios.post('/api/getacard', {numOfCards: 5}).then(results => {
            this.props.storeACard(results.data);
        })
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
                text: "Do you wanna send it?",
                type: 'warning',
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
                }
            })
        } else {
            swal({
                title: "You little Cheat!",
                type: 'error',
                test: 'You already played a card'
            })
        }

    }



  render() {
      let displayACards = this.props.aCards.map((e,i) => {
          return(

              <div onClick={()=>this.submitAnswer(e[0].id)} class={i} key={e[0].id} id='Acards' 
              role="menuitem"
              tabIndex={i}>
                <h2>{e[0].name}</h2>
                <br />
                <h4>{e[0].description}</h4>
                
              </div>
          )
      })
      let displayAnswers = this.props.sCards.map((e, i) => {
          return (
              <div key={e.id} id='Acards' role='menuitem'
              tabIndex={i}>
              <h2>{e.name}</h2>
                <br />
                <h4>{e.description}</h4>
              </div>
          )
      })

      let displayPending = () => {
        return (
            <div className='Loading-Icon'>
                    <DotLoader
                        className={override}
                        sizeUnit={"px"}
                        size={60}
                        color={'#AFAFAF'}
                        loading={this.state.loading}
                    />
                </div>
        )
      }


      let displayView = () => {
        let obj = this.arrayGet()
       
        if (obj[0].user === this.props.user.user){
            if(this.props.sCards.length < 1){
                return displayPending()
            }
            else {
                return displayAnswers
            }
            
        }

        else {
            return displayACards
        }


      }

      

    return (
      <div className='Acard-App'>
          <StyleRoot>
                    <Coverflow
                        width='100%'
                        height='100%'
                        outline-style='none'
                        displayQuantityOfSide={1}
                        infiniteScroll
                        enableHeading={true}
                        active={3}

                        media={{
                            '@media (max-width: 900px)': {
                                width: '411px',
                                height: '375px',
                                // marginTop: '330px'
                            },
                            '@media (min-width: 1000px)': {
                                width: '60vw',
                                height: '350px'
                            }
                        }}
                    >
                        {displayView()}
                    </Coverflow>
                </StyleRoot>
      </div>
    )
  }
}

function mapStateToProps(state){
    return {
        ...this.props, ...state
    }
}


export default connect(mapStateToProps, {storeACard, updateSCard, updateACards})(Acard)
