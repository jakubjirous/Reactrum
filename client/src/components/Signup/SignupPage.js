import React, {Component} from 'react';
import {connect} from 'react-redux';

import SignupForm from './SignupForm';
import { userSignupRequest, isUserExists } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';


/**
 * SignupPage component
 */
class SignupPage extends Component {

    render() {

        const {userSignupRequest, addFlashMessage, isUserExists} = this.props;

        return (
            <div className="row">
                <div className="col-xs-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <SignupForm
                        userSignupRequest={userSignupRequest}
                        addFlashMessage={addFlashMessage}
                        isUserExists={isUserExists} />
                </div>
            </div>
        )
    }
}

SignupPage.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    isUserExists: React.PropTypes.func.isRequired
};

export default connect(null, {userSignupRequest, addFlashMessage, isUserExists})(SignupPage);