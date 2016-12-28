import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';

// router config for react router
import routes from './routes';

render(
    <Router history={browserHistory} routes={routes} />,
    document.getElementById('app')
);