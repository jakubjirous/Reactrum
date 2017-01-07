import React, {Component} from 'react';
import classnames from 'classnames';
import TextFieldGroup from '../Common/TextFieldGroup';

import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';


function validateInput(data) {

    let errors = {};

    // title field validation
    if (Validator.isNull(data.title)) {
        errors.title = 'This field is required';
    }

    // categoryIdentifier field validation
    if (Validator.isNull(data.categoryIdentifier)) {
        errors.categoryIdentifier = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 * BoardCreateForm component
 */
class BoardCreateForm extends Component {

    constructor(props) {
        super(props);

        // component state
        this.state = {
            title: '',
            categoryIdentifier: '',
            categories: [],
            errors: {},
            isLoading: false,
            invalid: false
        };

        // binding
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    componentDidMount() {
        // load all categories from DB server via API
        this.props.getAllCategories().then(res => {
            let categories = this.state.categories;

            if (res.data.categories) {
                categories = res.data.categories;
                this.setState({categories});
            }
        });
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

            this.props.createBoard(this.state).then(
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'New board was successfully created.'
                    });

                    // redirects on successful server response
                    this.context.router.push('/boards');
                },
                ({response}) => this.setState({errors: response.data, isLoading: false})
            );

        }
    }

    render() {

        const {title, categoryIdentifier, errors, isLoading} = this.state;

        const options = this.state.categories.map(category =>
            <option key={category.id} value={category.id}>{category.title}</option>
        );

        return (
            <form onSubmit={this.onSubmit}>
                <h3>Create new board</h3>

                <TextFieldGroup
                    id="titleInput"
                    field="title"
                    value={title}
                    label="Title"
                    error={errors.title}
                    placeholder="Enter new board title"
                    onChange={this.onChange}
                />

                <div className={classnames('form-group', {'has-danger': errors.categoryIdentifier })}>
                    <label htmlFor="categorySelect" className="form-control-label">Category</label>
                    <select
                        className="form-control"
                        name="categoryIdentifier"
                        id="categorySelect"
                        onChange={this.onChange}
                        value={categoryIdentifier}>
                        <option value="" disabled>Choose new board category</option>
                        <option value="" disabled>–––––––––––––––––––––––––</option>
                        {options}
                    </select>
                    {errors.categoryIdentifier && <div className="form-control-feedback"><small>{errors.categoryIdentifier}</small></div>}
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

BoardCreateForm.propTypes = {
    createBoard: React.PropTypes.func.isRequired,
    getAllCategories: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
};

BoardCreateForm.contextTypes = {
    router: React.PropTypes.object.isRequired
};


export default BoardCreateForm;