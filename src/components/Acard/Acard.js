import React, { Component } from 'react';
import './Acard.css';
import axios from 'axios';
import {storeACard} from '../../ducks/reducer'
import {connect} from 'react-redux'

import Coverflow from 'react-coverflow';
import { StyleRoot } from 'radium';

class Acard extends Component {

    componentDidMount(){
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

  render() {
      let displayACards = this.props.aCards.map((e,i) => {
          return(

              <div class={i} key={e[0].id} id='Acards' 
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
              <div key={e[i].id} id='Answercards' role='menuitem'
              tabIndex={i}>
              <h2>{e[0].name}</h2>
                <br />
                <h4>{e[0].description}</h4>
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


export default connect(mapStateToProps, {storeACard})(Acard)
