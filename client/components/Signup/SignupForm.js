import React, {Component} from 'react';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../Common/TextFieldGroup';


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
            isLoading: false,
            invalid: false
        };

        // bind context
        this.onChange = this.onChange.bind(this);

        // sending data to the server on form submit
        this.onSubmit = this.onSubmit.bind(this);

        // bind function to check if user exists
        this.checkUserExists = this.checkUserExists.bind(this);
    }

    onChange(e) {
        // set state for each field in form
        this.setState({[e.target.name]: e.target.value});
    }


    checkUserExists(e) {
        const field = e.target.name;
        const val = e.target.value;

        if(val !== '') {
            this.props.isUserExists(val).then(res => {
                let errors = this.state.errors;
                let invalid;

                if(res.data.user) {
                    errors[field] = 'There is user with such ' + field;
                    invalid = true;
                } else {
                    errors[field] = '';
                    invalid = false;
                }
                this.setState({ errors, invalid });
            });
        }
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

        // client-side validation
        if (this.isValid()) {

            this.setState({errors: {}, isLoading: true});

            // promise
            this.props.userSignupRequest(this.state).then(
                // everything well
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'You signed up successfully. Welcome in reactrum.'
                    });

                    // redirects on successful server response
                    this.context.router.push('/');
                },
                // everything bad
                ({response}) => this.setState({errors: response.data, isLoading: false})
            );
        }
    }

    render() {

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
                    checkUserExists={this.checkUserExists}
                />

                <TextFieldGroup
                    id="emailInput"
                    field="email"
                    value={this.state.email}
                    label="E-mail"
                    error={errors.email}
                    placeholder="Enter your e-mail address"
                    onChange={this.onChange}
                    checkUserExists={this.checkUserExists}
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
                    <button type="submit" className="btn btn-primary" disabled={this.state.isLoading || this.state.invalid}>
                        Sign up
                    </button>
                </div>
            </form>
        )
    }
}

SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    isUserExists: React.PropTypes.func.isRequired
};

SignupForm.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default SignupForm;