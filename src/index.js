import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NewGame from './components/NewGames/NewGames'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<NewGame/>, document.getElementById('root'));
registerServiceWorker();
