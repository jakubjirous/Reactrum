import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {logout} from '../../actions/authActions';
import NavigationLink from '../Navigation/NavigationLink';

import './NavigationBar.scss';


/**
 * NavigationBar component
 */
class NavigationBar extends Component {

    constructor(props) {
        super(props);

        // binding
        this.logout = this.logout.bind(this);
    }

    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {

        const {isAuthenticated} = this.props.auth;
        const {username} = this.props.auth.user;

        const userLinks = (
            <ul className="nav navbar-nav float-xs-right">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown">
                        <i className="fa fa-user">&nbsp;</i>
                        {username}
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                        <a href="#" className="dropdown-item" onClick={this.logout}>
                            <i className="fa fa-sign-out">&nbsp;</i>
                            Logout
                        </a>
                    </div>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="nav navbar-nav float-xs-right">
                <NavigationLink to={`/login`}>
                    <i className="fa fa-sign-in">&nbsp;</i>
                    Login
                </NavigationLink>
                <NavigationLink to={`/signup`}>
                    <i className="fa fa-user-plus">&nbsp;</i>
                    Sign up
                </NavigationLink>
            </ul>
        );

        return (
            <nav className="navbar navbar-full navbar-dark bg-inverse">
                <div className="container">
                    <Link to={`/`} className="navbar-brand">
                        <i className="fa fa-connectdevelop">&nbsp;</i>
                        Reactrum
                    </Link>
                    <ul className="nav navbar-nav">
                        <NavigationLink to={`/boards`}>Boards</NavigationLink>
                    </ul>

                    {isAuthenticated ? userLinks : guestLinks}

                </div>
            </nav>
        )
    }
}


NavigationBar.propTypes = {
    auth: React.PropTypes.object.isRequired,
    logout: React.PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {logout})(NavigationBar);