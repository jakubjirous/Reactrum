import React, {Component} from 'react';
import TextFieldGroup from '../Common/TextFieldGroup';
import {connect} from 'react-redux';
import { login} from '../../actions/authActions';

import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';


function validateInput(data) {

    let errors = {};

    // identifier field validation
    if(Validator.isNull(data.identifier)) {
        errors.identifier = 'This field is required';
    }

    // password field validation
    if(Validator.isNull(data.password)) {
        errors.password = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 * LoginForm component
 */
class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            identifier: '',
            password: '',
            errors: {},
            isLoading: false
        };

        // binding
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    // client-side validation
    isValid() {
        const {errors, isValid} = validateInput(this.state);

        if (!isValid) {
            this.setState({errors});
        }

        return isValid;
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    onSubmit(e) {
        e.preventDefault();

        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true });
            this.props.login(this.state).then(
                () => this.context.router.push('/boards'),
                ({response}) => this.setState({errors: response.data.errors, isLoading: false})
            );
        }
    }


    render() {

        const {identifier, password, errors, isLoading} = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>

                {errors.form && <div className="alert alert-danger">{errors.form}</div>}

                <TextFieldGroup
                    id="identifierInput"
                    field="identifier"
                    value={identifier}
                    label="Username / E-mail"
                    error={errors.identifier}
                    placeholder="Enter your username or e-mail"
                    onChange={this.onChange}
                />

                <TextFieldGroup
                    id="passwordInput"
                    field="password"
                    type="password"
                    value={password}
                    label="Password"
                    error={errors.password}
                    placeholder="Enter your password"
                    onChange={this.onChange}
                />

                <div className="form-group">
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                        Login
                    </button>
                </div>
            </form>
        )
    }
}

LoginForm.propTypes = {
    login: React.PropTypes.func.isRequired
};

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(null, {login})(LoginForm);