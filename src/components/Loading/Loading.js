import React, { Component } from 'react';
import './Loading.css';

import BottomNavigation  from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { css } from 'react-emotion';
import { GridLoader } from 'react-spinners';

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
                
                    <div className="waitingOnBubble">
                    BillyBob
                    </div>

                </div>
            </div>
        );
    }
}

export default (Loading);