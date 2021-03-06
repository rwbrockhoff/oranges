import React, { Component } from 'react';
import './Loading.css';

import BottomNavigation  from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { css } from 'react-emotion';
import { GridLoader } from 'react-spinners';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import {addPlayer, setJudge, updateQCard, readyPlayer} from '../../ducks/reducer'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const socket = io.connect('https://server.aktlist.com')


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
            waiting: true,
            waitingPlayers: [],
            propsReadyPlayers: []
        }

        socket.on('user-added', data =>{
            let tempArr = this.props.users.slice(0)
            tempArr.push(data)
            console.log(tempArr)
            this.props.addPlayer(tempArr)
          })

        socket.on('ready-player-added', data => {
            // console.log('readyplayers', data)
            this.props.readyPlayer(data)
          })
  
          socket.on('readied-players', () => {

            socket.emit('readyPlayers-array', {players: this.props.readyPlayers, room: this.props.room})
          })

          socket.on('getQCard', data => {
            this.props.updateQCard(data.qCard)
        })

    }

    async componentDidMount(){
        console.log(this.props.room, 'room')
        socket.emit('join-room-generic', {room:this.props.room})
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
        if(this.props.readyPlayers.length === this.props.users.length){
            axios.put('https://server.aktlist.com/api/lockroom', {roomName:this.props.room})
            .then(
                this.setState({
                    waiting: false
                }),
        
                this.setJudge(),
                this.toGame()
            )

        } else if (this.props.readyPlayers.length !== this.props.users.length){
            this.setState({
                waiting: true
            })
        }
        
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
            if(this.props.readyPlayers.length === this.props.users.length){
                this.setState({
                    waiting: false
                }),
                this.setJudge(),
                this.toGame()
            } else if (this.props.readyPlayers.length !== this.props.users.length){
                this.setState({
                    waiting: true
                })
            }
        }
        
    }

    setJudge = () => {
        let modifiedUsers = this.props.users
        let index = Math.floor ( Math.random() * this.props.users.length )
        modifiedUsers[0].judge = true
        this.props.setJudge(modifiedUsers)
    }


    toGame(){
        setTimeout(()=>{
            this.setState({
                toGame: true
            })
        },3000)
    }

    render() {
        return (
            <div className='Loading-App'>
                <div className='Loading-Icon'>
                    <GridLoader
                        className={override}
                        sizeUnit={"px"}
                        size={60}
                        color={'whitesmoke'}
                        loading={this.state.loading}
                    />
                </div>
                <h2><strong>{this.state.waiting ? 'Waiting on the following players...' : 'Shuffling deck...'}</strong></h2>
                <div className="waitingOnPlayers">

                {/* Store all Mapped Users Inside of waitingOnPlayers, and use div class waitingOnBubble for each rendered User.  */}
                {this.state.waitingPlayers.map(e => {
                    // console.log('e',e)
                    return(
                    <div className="userbubble">
                    {/* <div className="image-div-loading"> */}
                    <div className="main-image-div">
                    <div className="stem-new"></div>
                    <div className="leaf1-new"></div>
                    <div className="leaf2-new"></div>
                    <div className="image-div">
                        <img className='userImage' src={e.userPic} />
                    </div>
                    </div>
                        {/* </div> */}
                        {e.user}
                    </div>
                    )
                })}

                </div>
                {this.state.toGame ? <Redirect to="/Game"/> : ''}
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

export default connect(mapStateToProps,{addPlayer, setJudge, updateQCard,readyPlayer})(Loading);