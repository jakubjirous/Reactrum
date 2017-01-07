import React from 'react';
import {Route, IndexRoute} from 'react-router';

import requireAuth from './utils/requireAuth';
import App from './components/App/App';
import Greetings from './components/Greetings/Greetings';
import LoginPage from './components/Login/LoginPage';
import SignupPage from './components/Signup/SignupPage';
import BoardCreatePage from './components/Board/BoardCreatePage';
import BoardPage from './components/Board/BoardPage';
import TopicCreatePage from './components/Topic/TopicCreatePage';
import TopicPage from './components/Topic/TopicPage';
import PostPage from './components/Post/PostPage';
import PostCreatePage from './components/Post/PostCreatePage';


export default (
    <Route path="/" component={App}>
        <IndexRoute component={Greetings}/>
        <Route path="boards" component={BoardPage}/>
        <Route path="/board/:id" component={TopicPage}/>
        <Route path="/board/:id/topic/:id" component={PostPage}/>
        <Route path="board-create" component={requireAuth(BoardCreatePage)}/>
        <Route path="topic-create/:id" component={requireAuth(TopicCreatePage)}/>
        <Route path="post-create/:id/:id" component={requireAuth(PostCreatePage)}/>
        <Route path="login" component={LoginPage}/>
        <Route path="signup" component={SignupPage}/>
    </Route>
)