import React, { Component } from 'react';
import './Loading.css';

import BottomNavigation  from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { css } from 'react-emotion';
import { GridLoader } from 'react-spinners';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import {addPlayer} from '../../ducks/reducer'

const socket = io.connect('http://localhost:3020')


const root = css`
        width: 500;
        margin-top: 240px;
`;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    padding-top: 10px;
`;

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            waitingPlayers: [],
            propsReadyPlayers: []
        }

        socket.on('ready-player-added', data => {
            // console.log('readyplayers', data)
            this.props.readyPlayer(data)
          })
  
          socket.on('readied-players', () => {
            socket.emit('readyPlayers-array', {players: this.props.readyPlayers, room: this.props.room})
          })

    }

    async componentDidMount(){
        await this.setState({propsReadyPlayers: this.props.readyPlayers})
        let tempArray = []
        this.props.users.map((e,i) => {
            console.log('users', e)
            let indexOfPlayer = this.state.propsReadyPlayers.findIndex((element) => {
                console.log('element', element, e)
                return element.user === e.user
            })
            console.log(indexOfPlayer,"index")
            if(indexOfPlayer === -1){
                tempArray.push(this.props.users[i])
            }
            return tempArray
        })
        this.setState({waitingPlayers: tempArray})
    }
    
    async componentDidUpdate(prevProps){
        if(this.props.readyPlayers !== prevProps.readyPlayers || this.props.users !== prevProps.users){
            await this.setState({propsReadyPlayers: this.props.readyPlayers})
            let tempArray = []
            this.props.users.map((e,i) => {
                console.log('users', e)
                let indexOfPlayer = this.state.propsReadyPlayers.findIndex((element) => {
                    console.log('element', element, e)
                    return element.user === e.user
                })
                console.log(indexOfPlayer,"index")
                if(indexOfPlayer === -1){
                    tempArray.push(this.props.users[i])
                }
                return tempArray
            })
            this.setState({waitingPlayers: tempArray})
        }
    }

    render() {
        return (
            <div className='Loading-App'>
                <div className='Loading-Icon'>
                    <GridLoader
                        className={override}
                        sizeUnit={"px"}
                        size={60}
                        color={'#FFC53A'}
                        loading={this.state.loading}
                    />
                </div>
                <h2><strong>Waiting on other players...</strong></h2>
                <div className="waitingOnPlayers">

                {/* Store all Mapped Users Inside of waitingOnPlayers, and use div class waitingOnBubble for each rendered User.  */}
                {this.state.waitingPlayers.map(e => {
                    // console.log('e',e)
                    return(
                    <div className="waitingOnBubble">
                        {e.user}
                    </div>
                    )
                })}

                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        readyPlayers: state.readyPlayers,
        users: state.users,
        room: state.room
    }
}

export default connect(mapStateToProps,{addPlayer})(Loading);