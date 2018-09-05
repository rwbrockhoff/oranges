import React, { Component } from 'react';
import './Pending.css';

import { css } from 'react-emotion';
import { PacmanLoader } from 'react-spinners';

const override2 = css`
    display: block;
    margin: 0 auto;
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
                        color={'#f2e609'}
                        loading={this.state.loading}
                    />
                </div>
                <h2><strong>Waiting for other Players...</strong></h2>
            </div>
        );
    }
}