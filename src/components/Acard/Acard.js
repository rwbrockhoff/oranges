import React, { Component } from 'react';
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
              <div key={i}>
                <h2>{e[0].name}</h2>
                <h4>{e[0].description}</h4>
              </div>
          )
      })
    return (
      <div>
          <StyleRoot>
                    <Coverflow
                        displayQuantityOfSide={2}
                        infiniteScroll
                        enableHeading
                        media={{
                            '@media (max-width: 900px)': {
                                width: '411px',
                                height: '375px',
                                marginTop: '355px'
                            },
                            '@media (min-width: 900px)': {
                                width: '960px',
                                height: '600px'
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