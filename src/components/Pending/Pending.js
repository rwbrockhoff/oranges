import React, { Component } from 'react';
import './Pending.css';
import {connect} from 'react-redux'
import { css } from 'react-emotion';
import { PacmanLoader } from 'react-spinners';
import io from 'socket.io-client'
import {Redirect} from 'react-router-dom'
import {addPlayer, addWinningCard} from '../../ducks/reducer'

const override2 = css`
    display: block;
    margin: 0 auto;
    padding-right: 100px;
    border-color: red;
    padding-top: 0px;
`;

const socket = io.connect('http://localhost:3020')

class Pending extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            toWaiting: false,
            judgeDeciding: false
        }


        socket.on('updated-users-pending', data => {
            this.props.addPlayer(data.users)
            this.props.addWinningCard(data.winner[0])
            this.setState({
                toWaiting: true
            })
        })
    }
    componentDidMount(){
        socket.emit('join-room-generic', {room:this.props.room})
            if(this.props.sCards.length === this.props.users.length - 1){
                this.setState({judgeDeciding : true})
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.sCards !== prevProps.sCards){
            if(this.props.sCards.length === this.props.users.length - 1){
                this.setState({judgeDeciding : true})
            }
        }
    }

    


    render() {
        

        return (
            <div className='Pending-App'>
                <div className='Pending-Icon'>
                    <PacmanLoader
                        className={override2}
                        sizeUnit={"px"}
                        size={50}
                        color={'#F3CA40'}
                        loading={this.state.loading}
                    />
                </div>

                 
        <img id="cloud1" src={require("../../assets/clouds.png")}/>
        <img id="cloud2" src={require("../../assets/clouds.png")}/>
        <img id="cloud3" src={require("../../assets/clouds.png")}/>
        <img id="cloud4" src={require("../../assets/clouds.png")}/>
               
                <div className='Pending-Text'>
                {this.state.judgeDeciding === false ? 
                <h2><strong>Waiting for other Players...</strong></h2> :
                <h2><strong>Waiting on the judge...</strong></h2>

                }
                </div>
                {this.state.toWaiting ? <Redirect to="/End-Game"/> : ''}
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        ...this.props, ...state
    }
}

export default connect(mapStateToProps, {addPlayer, addWinningCard})(Pending)