import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NewGame from './components/NewGames/NewGames'
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import {HashRouter} from 'react-router-dom'
import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
, document.getElementById('root'));

registerServiceWorker();
