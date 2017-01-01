import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { setCurrentUser } from './actions/authActions';


// router config for react router
import routes from './routes';

const store = createStore(
    // (state = {}) => state,
    rootReducer,
    compose(
        // thunk middleware allows dispatch async actions
        applyMiddleware(thunk),

        // initialize redux devToolsExtension if we have this
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ),
);


// load token from localStorage
if(localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}



render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('app')
);