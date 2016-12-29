import React, {Component} from 'react';
import {connect} from 'react-redux';

import SignupForm from './SignupForm';
import { userSignupRequest } from '../../actions/signupActions'

/**
 * SignupPage component
 */
class SignupPage extends Component {

    render() {

        const {userSignupRequest} = this.props;

        return (
            <div className="row">
                <div className="col-xs-12 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
                    <SignupForm userSignupRequest={userSignupRequest}/>
                </div>
            </div>
        )
    }
}

SignupPage.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired
};

export default connect(null, {userSignupRequest})(SignupPage);