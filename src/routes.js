import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Qcard from './components/Qcard/Qcard';

export default(
    <Switch>
        <Route exact path='/' component={Qcard} />
    </Switch>
)
