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
                        size={80}
                        color={'#FC9C4D'}
                        loading={this.state.loading}
                    />
                </div>
                <h2><strong>Waiting on other players...</strong></h2>
                <BottomNavigation
                    showLabels
                    className={root}
                >
                    <BottomNavigationAction label='Leave Game' style={{color: '#333', fontSize: '30px'}} />
                </BottomNavigation>
            </div>
        );
    }
}

export default (Loading);