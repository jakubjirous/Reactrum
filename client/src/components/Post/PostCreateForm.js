import React, {Component} from 'react';
import classnames from 'classnames';

import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';


function validateInput(data) {

    let errors = {};

    // text field validation
    if (Validator.isNull(data.text)) {
        errors.text = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 * PostCreateForm component
 */
class PostCreateForm extends Component {

    constructor(props) {
        super(props);

        // component state
        this.state = {
            text: '',
            boardIdentifier: this.props.boardIdentifier,
            topicIdentifier: this.props.topicIdentifier,
            userIdentifier: this.props.user.id,
            errors: {},
            isLoading: false,
            invalid: false
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
        // set state for each field in form
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        // client-side validation
        if (this.isValid()) {

            this.setState({errors: {}, isLoading: true});

            this.props.createPost(this.state).then(
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'New post was successfully created.'
                    });

                    // redirects on successful server response
                    this.context.router.push(`/board/${this.state.boardIdentifier}/topic/${this.state.topicIdentifier}`);
                },
                ({response}) => this.setState({errors: response.data, isLoading: false})
            );
        }
    }

    render() {

        const {text, errors, isLoading} = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h3>Create new post</h3>

                <div className={classnames('form-group', {'has-danger': errors.text })}>
                    <label htmlFor="textInput" className="form-control-label">Text</label>
                    <textarea
                        className="form-control"
                        name="text"
                        id="textInput"
                        placeholder="Enter new post text"
                        onChange={this.onChange}
                        value={text}>
                    </textarea>
                    {errors.text && <div className="form-control-feedback"><small>{errors.text}</small></div>}
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                        Create
                    </button>
                </div>
            </form>
        )
    }
}

PostCreateForm.propTypes = {
    user: React.PropTypes.object.isRequired,
    boardIdentifier: React.PropTypes.number.isRequired,
    topicIdentifier: React.PropTypes.number.isRequired,
    createPost: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
};

PostCreateForm.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default PostCreateForm;