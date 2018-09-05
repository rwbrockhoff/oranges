import React, { Component } from 'react';
import axios from 'axios';
import {storeQCard} from '../../ducks/reducer';
import {connect} from 'react-redux';
import './Qcard.css';

class Qcard extends Component {


    componentDidMount(){
        axios.get('/api/getqcard').then(results => {
            this.props.storeQCard(results.data)
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
      <div className='qcard-container' >
          {displayQCard}
      </div>
    )
  }
}

function mapStateToProps(state){
    return {
        qCard: state.qCard
    }
}

export default connect(mapStateToProps, {storeQCard})(Qcard);