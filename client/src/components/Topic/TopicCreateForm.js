import React, {Component} from 'react';
import TextFieldGroup from '../Common/TextFieldGroup';

import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';


function validateInput(data) {

    let errors = {};

    // title field validation
    if (Validator.isNull(data.title)) {
        errors.title = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 * TopicCreateForm component
 */
class TopicCreateForm extends Component {

    constructor(props) {
        super(props);

        // component state
        this.state = {
            title: '',
            boardIdentifier: this.props.boardIdentifier,
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

            this.props.createTopic(this.state).then(
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'New topic was successfully created.'
                    });

                    // redirects on successful server response
                    this.context.router.push(`/board/${this.state.boardIdentifier}`);
                },
                ({response}) => this.setState({errors: response.data, isLoading: false})
            );
        }
    }

    render() {

        const {title, errors, isLoading} = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h3>Create new topic</h3>

                <TextFieldGroup
                    id="titleInput"
                    field="title"
                    value={title}
                    label="Title"
                    error={errors.title}
                    placeholder="Enter new topic title"
                    onChange={this.onChange}
                />

                <div className="form-group">
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                        Create
                    </button>
                </div>
            </form>
        )
    }
}

TopicCreateForm.propTypes = {
    user: React.PropTypes.object.isRequired,
    boardIdentifier: React.PropTypes.number.isRequired,
    createTopic: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
};

TopicCreateForm.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default TopicCreateForm;