import React, { Component } from 'react';
import axios from 'axios';
import {storeACard} from '../../ducks/reducer'
import {connect} from 'react-redux'

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
        {displayACards}
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