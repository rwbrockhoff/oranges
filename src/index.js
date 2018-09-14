import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import store from './store'
//Components
import EndGame from './components/Endgame/Endgame';
import EndRound from './components/Endround/Endround';
import Game from './components/Game/Game';
import Home from './components/Home/Home';
import JoinGame from './components/JoinGame/JoinGame';
import Loading from './components/Loading/Loading';
import NewGame from './components/NewGames/NewGames';
import Pending from './components/Pending/Pending';
import CreateRoom from './components/CreateRoom/CreateRoom';
import BottomNav from './components/BottomNavBar/BottomNavBar';
import WinnerIs from './components/WinnerIs/WinnerIs'
import MusicTheme from './components/MusicTheme/MusicTheme'


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path='/' render={() => (
                    <div>
                        <Home/>
                        <MusicTheme/>
                    </div>
                )} />

                <Route path='/Create-Room' render={() => (
                    <div>
                        <CreateRoom/>
                        <MusicTheme/>
                    </div>
                )} />
                
                <Route path='/New-Game' render={() => (
                    <div>
                        <NewGame />
                        <MusicTheme/>
                        <BottomNav />
                    </div>
                )} />

                <Route path='/Join-Game' render={() => (
                    <div>
                        <JoinGame />
                        <MusicTheme/>
                    </div>
                )} />

                <Route path='/Loading' render={() => (
                    <div>
                        <Loading />
                        <BottomNav />
                    </div>
                )} />

                <Route path='/Game' render={() => (
                    <div>
                        <Game />
                        <BottomNav />
                    </div>
                )} />

                <Route path='/Pending' render={() => (
                    <div>
                        <Pending />
                        <BottomNav />
                    </div>
                )} />

                <Route path='/End-Round' render={() => (
                    <div>
                        <EndRound />
                    </div>
                )} />

                <Route path='/End-Game' render={() => (
                    <div>
                        <EndGame />
                        <BottomNav />
                    </div>
                )} />

                <Route path='/Winner' render={() => (
                    <div>
                        <WinnerIs/>
                    </div>
                )} />

                <App/>
            </Switch>
        </Router>
    </Provider>
, document.getElementById('root'));