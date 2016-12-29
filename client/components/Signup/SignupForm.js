import React, {Component} from 'react';
import map from 'lodash/map';

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
            passwordConfirmation: ''
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
        e.preventDefault();

        // post request on server
        // axios.post('/api/users', { user: this.state });

        this.props.userSignupRequest(this.state);
    }

    render() {

        // const options = map(timezones, (val, key) => {
        //    <option key={val} val={val}>{key}</option>
        // });

        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join reactrum</h1>

                <div className="form-group">
                    <label htmlFor="usernameInput">Username</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Enter username"
                        id="usernameInput"
                        value={this.state.username}
                        onChange={this.onChange}
                    />
                    <small className="form-text text-muted"></small>
                </div>

                <div className="form-group">
                    <label htmlFor="emailInput">E-mail</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter e-mail"
                        id="emailInput"
                        value={this.state.email}
                        onChange={this.onChange}
                    />
                    <small className="form-text text-muted"></small>
                </div>

                <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter password"
                        id="passwordInput"
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                    <small className="form-text text-muted"></small>
                </div>

                <div className="form-group">
                    <label htmlFor="passwordConfirmationInput">Password confirmation</label>
                    <input
                        type="password"
                        name="passwordConfirmation"
                        className="form-control"
                        placeholder="Enter password confirmation"
                        id="passwordConfirmationInput"
                        value={this.state.passwordConfirmation}
                        onChange={this.onChange}
                    />
                    <small className="form-text text-muted"></small>
                </div>


                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-lg">
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