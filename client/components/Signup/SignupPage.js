import React, {Component} from 'react';

import SignupForm from './SignupForm';


/**
 * SignupPage component
 */
class SignupPage extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-xs-12 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
                    <SignupForm />
                </div>
            </div>
        )
    }
}

export default SignupPage;