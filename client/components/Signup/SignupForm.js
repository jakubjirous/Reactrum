import React, {Component} from 'react';
import map from 'lodash/map';
import classnames from 'classnames';


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

    onSubmit(e) {
        // clear all errors
        this.setState({ errors: {}, isLoading: true });
        e.preventDefault();

        // post request on server
        // axios.post('/api/users', { user: this.state });

        // promise
        this.props.userSignupRequest(this.state).then(
            // everything well
            () => {},
            // everything bad
            ({ response }) => this.setState({ errors: response.data, isLoading: false })
        );
    }

    render() {

        // const options = map(timezones, (val, key) => {
        //    <option key={val} val={val}>{key}</option>
        // });

        const { errors } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join reactrum</h1>

                <div className={classnames('form-group', { 'has-danger': errors.username })}>
                    <label className="form-control-label" htmlFor="usernameInput">Username</label>
                    <input
                        type="text"
                        name="username"
                        className={classnames('form-control', { 'form-control-danger': errors.username })}
                        placeholder="Enter username"
                        id="usernameInput"
                        value={this.state.username}
                        onChange={this.onChange}
                    />
                    {errors.username && <div className="form-control-feedback"><small>{errors.username}</small></div>}
                </div>

                <div className={classnames('form-group', { 'has-danger': errors.email })}>
                    <label className="form-control-label" htmlFor="emailInput">E-mail</label>
                    <input
                        type="email"
                        name="email"
                        className={classnames('form-control', { 'form-control-danger': errors.email })}
                        placeholder="Enter e-mail"
                        id="emailInput"
                        value={this.state.email}
                        onChange={this.onChange}
                    />
                    {errors.email && <div className="form-control-feedback"><small>{errors.email}</small></div>}
                </div>

                <div className={classnames('form-group', { 'has-danger': errors.password })}>
                    <label className="form-control-label" htmlFor="passwordInput">Password</label>
                    <input
                        type="password"
                        name="password"
                        className={classnames('form-control', { 'form-control-danger': errors.password })}
                        placeholder="Enter password"
                        id="passwordInput"
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                    {errors.password && <div className="form-control-feedback"><small>{errors.password}</small></div>}
                </div>

                <div className={classnames('form-group', { 'has-danger': errors.passwordConfirmation })}>
                    <label className="form-control-label" htmlFor="passwordConfirmationInput">Password confirmation</label>
                    <input
                        type="password"
                        name="passwordConfirmation"
                        className={classnames('form-control', { 'form-control-danger': errors.passwordConfirmation })}
                        placeholder="Enter password confirmation"
                        id="passwordConfirmationInput"
                        value={this.state.passwordConfirmation}
                        onChange={this.onChange}
                    />
                    {errors.passwordConfirmation && <div className="form-control-feedback"><small>{errors.passwordConfirmation}</small></div>}
                </div>


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

export default SignupForm;