import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App/App';
import Greetings from './components/Greetings/Greetings';
import BoardCreatePage from './components/Board/BoardCreatePage';
import BoardPage from './components/Board/BoardPage';
import LoginPage from './components/Login/LoginPage';
import SignupPage from './components/Signup/SignupPage';
import requireAuth from './utils/requireAuth';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Greetings} />
        <Route path="board" component={BoardPage} />
        <Route path="board-create" component={requireAuth(BoardCreatePage)} />
        <Route path="login" component={LoginPage} />
        <Route path="signup" component={SignupPage} />
    </Route>
)