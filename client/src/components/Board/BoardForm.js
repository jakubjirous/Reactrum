import React, {Component} from 'react';
import TextFieldGroup from '../Common/TextFieldGroup';
import { connect } from 'react-redux';
import { createBoard } from '../../actions/boardActions';


/**
 * BoardForm component
 */
class BoardForm extends Component {

    constructor(props) {
        super(props);

        // component state
        this.state = {
            title: '',
            errors: {},
            isLoading: false
        };

        // binding
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {

    }

    onSubmit(e) {
        e.preventDefault();
        this.props.createBoard(this.state);
    }

    render() {

        const {title, errors, isLoading} = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h1>Create new board</h1>

                <TextFieldGroup
                    id="titleInput"
                    field="title"
                    value={title}
                    label="Title"
                    error={errors.title}
                    placeholder="Enter new board title"
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

BoardForm.propTypes = {
    createBoard: React.PropTypes.func.isRequired,
};

BoardForm.contextTypes = {
    router: React.PropTypes.object.isRequired
};


export default connect(null, { createBoard })(BoardForm);