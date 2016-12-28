import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App/App';
import Greetings from './components/Greetings/Greetings';
import BoardPage from './components/Board/BoardPage';
import LoginPage from './components/Login/LoginPage';
import SignupPage from './components/Signup/SignupPage';


export default (
    <Route path="/" component={App}>
        <IndexRoute component={Greetings} />
        <Route path="board" component={BoardPage} />
        <Route path="login" component={LoginPage} />
        <Route path="signup" component={SignupPage} />
    </Route>
)