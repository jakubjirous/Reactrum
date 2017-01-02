import React, {Component} from 'react';

import LoginForm from './LoginForm';


/**
 * LoginPage component
 */
class LoginPage extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-xs-12 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
                    <LoginForm />
                </div>
            </div>

        )
    }
}

export default LoginPage;