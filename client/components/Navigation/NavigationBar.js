import React, {Component} from 'react';
import {Link} from 'react-router';

import NavigationLink from '../Navigation/NavigationLink';
// import logo from 'logo.svg';


/**
 * NavigationBar component
 */
class NavigationBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-full navbar-dark bg-inverse">
                <div className="container">
                    <Link to={`/`} className="navbar-brand">
                        <img src="logo.svg" className="Menu-logo" alt="logo"/>
                        Reactrum
                    </Link>
                    <ul className="nav navbar-nav">
                        <NavigationLink to={`/board`}>Board</NavigationLink>
                    </ul>

                    <ul className="nav navbar-nav float-xs-right">
                        <NavigationLink to={`/login`}>Login</NavigationLink>
                        <NavigationLink to={`/signup`}>Sign up</NavigationLink>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavigationBar;