import React, { Component } from 'react';
import './Pending.css';

import { css } from 'react-emotion';
import { PacmanLoader } from 'react-spinners';

const override2 = css`
    display: block;
    margin: 0 auto;
    padding-right: 100px;
    border-color: red;
    padding-top: 0px;
`;

export default class Pending extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
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
                <div className='Pending-Text'>
                <h2><strong>Waiting for other Players...</strong></h2>
                </div>
            </div>
        );
    }
}