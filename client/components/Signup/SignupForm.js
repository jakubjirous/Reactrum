import React, {Component} from 'react';
import map from 'lodash/map';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../Common/TextFieldGroup';
import { browserHistory } from 'react-router';

/**
 * SignupForm component
 */
class SignupForm extends Component {

    constructor(props) {
        super(props);

        // component state
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            errors: {},
            isLoading: false
        };

        // bind context
        this.onChange = this.onChange.bind(this);

        // sending data to the server on form submit
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        // set state for each field in form
        this.setState({[e.target.name]: e.target.value});
    }

    // client-side validation
    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if(!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.isValid()) {

            this.setState({errors: {}, isLoading: true});

            // promise
            this.props.userSignupRequest(this.state).then(
                // everything well
                () => {
                    // redirects on successful server response
                    // browserHistory.push('/');
                    this.context.router.push('/');
                },
                // everything bad
                ({response}) => this.setState({errors: response.data, isLoading: false})
            );
        }

        // promise
        this.props.userSignupRequest(this.state).then(
            // everything well
            () => { },
            // everything bad
            ({response}) => this.setState({errors: response.data, isLoading: false})
        );
    }

    render() {

        // const options = map(timezones, (val, key) => {
        //    <option key={val} val={val}>{key}</option>
        // });

        const {errors} = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join reactrum</h1>

                <TextFieldGroup
                    id="usernameInput"
                    field="username"
                    value={this.state.username}
                    label="Username"
                    error={errors.username}
                    placeholder="Enter your username"
                    onChange={this.onChange}
                />

                <TextFieldGroup
                    id="emailInput"
                    field="email"
                    value={this.state.email}
                    label="E-mail"
                    error={errors.email}
                    placeholder="Enter your e-mail address"
                    onChange={this.onChange}
                />

                <TextFieldGroup
                    id="passwordInput"
                    field="password"
                    value={this.state.password}
                    label="Password"
                    error={errors.password}
                    type="password"
                    placeholder="Enter your password"
                    onChange={this.onChange}
                />

                <TextFieldGroup
                    id="passwordConfirmationInput"
                    field="passwordConfirmation"
                    value={this.state.passwordConfirmation}
                    label="Password confirmation"
                    error={errors.passwordConfirmation}
                    type="password"
                    placeholder="Enter your password confirmation"
                    onChange={this.onChange}
                />

                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={this.state.isLoading}>
                        Sign up
                    </button>
                </div>
            </form>
        )
    }
}

SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired
};

SignupForm.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default SignupForm;