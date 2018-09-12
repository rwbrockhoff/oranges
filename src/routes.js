import React from 'react';

import { Switch, Route } from 'react-router-dom';

// import Acard from './components/Acard/Acard';
import EndGame from './components/Endgame/Endgame';
import EndRound from './components/Endround/Endround';
import Game from './components/Game/Game';
import Home from './components/Home/Home';
import JoinGame from './components/JoinGame/JoinGame';
import Loading from './components/Loading/Loading';
import NewGame from './components/NewGames/NewGames';
import Pending from './components/Pending/Pending';
import CreateRoom from './components/CreateRoom/CreateRoom';
import BottomNavBar from './components/BottomNavBar/BottomNavBar';
import WinnerIs from './components/WinnerIs/WinnerIs'
// import Qcard from './components/Qcard/Qcard';

export default (
    <Switch>
        <Route component={Home} exact path='/' />
        <Route component={NewGame} path='/New-Game' />
        <Route component={JoinGame} path='/Join-Game' />
        <Route component={Loading} path='/Loading' />
        <Route component={Game} path='/Game' />
        <Route component={Pending} path='/Pending' />
        <Route component={EndRound} path='/End-Round' />
        <Route component={EndGame} path='/End-Game' />
        <Route component={CreateRoom} path='/Create-Room'/>
        <Route component={BottomNavBar} path='/nav'/>
        <Route component={WinnerIs} path="/Winner"/>
    </Switch>
);
