import React, {Component} from 'react';
import {Link} from 'react-router';


import './Greetings.scss';


/**
 * Greetings component
 */
class Greetings extends Component {
    render() {
        return (
            <div>
                <div className="greetings-header">
                    <i className="fa fa-connectdevelop">&nbsp;</i>
                    <h1>Welcome in reactrum</h1>
                    <h5>Easy forum created by React/Redux technology</h5>

                    <Link to="/boards" className="btn btn-primary btn-lg">Get started</Link>
                </div>
            </div>
        )
    }
}

export default Greetings;