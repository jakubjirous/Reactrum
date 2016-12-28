import React, {Component} from 'react';
import {Link} from 'react-router';

// import logo from 'logo.svg';
// import './Greetings.css';


/**
 * Greetings component
 */
class Greetings extends Component {
    render() {
        return (
            <div>
                <div className="Greetings-header">
                    <img src="" className="Greetings-logo" alt="logo"/>
                    <h2>Welcome to Reactrum</h2>
                    <h6>Easy forum created in React technology</h6>
                </div>

                <Link to="/board" className="btn btn-primary btn-lg">Get started</Link>
            </div>
        )
    }
}

export default Greetings;