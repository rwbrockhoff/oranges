import React, { Component } from 'react';
import './Loading.css';

import { css } from 'react-emotion';
import { GridLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    padding-top: 200px;
`;

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
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
                        color={'#ff7023'}
                        loading={this.state.loading}
                    />
                </div>
                <h2><strong>Shuffling...</strong></h2>
            </div>
        );
    }
}