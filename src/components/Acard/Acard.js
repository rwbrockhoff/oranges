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
    }
  render() {
      let displayACards = this.props.aCards.map((e,i) => {
          return(
              <div key={i} id='Acards'>
                <h2>{e[0].name}</h2>
                <h4>{e[0].description}</h4>
              </div>
          )
      })
    return (
      <div className='Acard-App'>
          <StyleRoot>
                    <Coverflow
                        displayQuantityOfSide={1}
                        infiniteScroll
                        enableHeading
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
                        {displayACards}
                    </Coverflow>
                </StyleRoot>
      </div>
    )
  }
}

function mapStateToProps(state){
    return {
        aCards: state.aCards
    }
}


export default connect(mapStateToProps, {storeACard})(Acard)