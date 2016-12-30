import React, {Component} from 'react';
import classnames from 'classnames';


/**
 * FlashMessage component
 */
class FlashMessage extends Component {

    constructor(props) {
        super(props);

        // bind click
        this.onClick = this.onClick.bind(this);
    }


    onClick() {
        this.props.deleteFlashMessage(this.props.message.id);
    }

    render() {

        const {id, type, text} = this.props.message;

        return (
            <div className={classnames('alert', {
                'alert-success': type === 'success',
                'alert-danger': type === 'error'
            })} role="alert">
                <button onClick={this.onClick} type="button" className="close">
                    <span>&times;</span>
                </button>
                {text}
            </div>
        )
    }
}

FlashMessage.PropTypes = {
    message: React.PropTypes.object.isRequired,
    deleteFlashMessage: React.PropTypes.func.isRequired
};


export default FlashMessage;