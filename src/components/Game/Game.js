import React, { Component } from 'react';
import './Game.css';

import Coverflow from 'react-coverflow';
import { StyleRoot } from 'radium';

export default class Game extends Component {
    render() {
        return (
            <div className='Game-App'>
                <StyleRoot>
                    <Coverflow
                        displayQuantityOfSide={2}
                        infiniteScroll
                        enableHeading
                        media={{
                            '@media (max-width: 900px)': {
                                width: '411px',
                                height: '375px',
                                marginTop: '355px'
                            },
                            '@media (min-width: 900px)': {
                                width: '960px',
                                height: '600px'
                            }
                        }}
                    >
                        <img src='https://dougsarchaeology.files.wordpress.com/2015/12/back-black.png' alt='' data-action="" />
                        <img src='https://dougsarchaeology.files.wordpress.com/2015/12/back-black.png' alt='' data-action="" />
                        <img src='https://dougsarchaeology.files.wordpress.com/2015/12/back-black.png' alt='' data-action="" />
                        <img src='https://dougsarchaeology.files.wordpress.com/2015/12/back-black.png' alt='' data-action="" />
                        <img src='https://dougsarchaeology.files.wordpress.com/2015/12/back-black.png' alt='' data-action="" />
                    </Coverflow>
                </StyleRoot>
            </div>
        );
    }
}