import React, {Component} from 'react';
import {connect} from 'react-redux';

import FlashMessage from '../Flash/FlashMessage';
import {deleteFlashMessage} from '../../actions/flashMessages';


/**
 * FlashMessageList component
 */
class FlashMessageList extends Component {

    render() {
        // separate deleteFlashMessage from props
        const { deleteFlashMessage } = this.props;

        const messages = this.props.messages.map(message =>
            <FlashMessage key={message.id} message={message} deleteFlashMessage={deleteFlashMessage} />
        );

        return (
            <div className="container">
                {messages}
            </div>
        )
    }
}

FlashMessageList.PropTypes = {
    messages: React.PropTypes.array.isRequired,
    deleteFlashMessage: React.PropTypes.func.isRequired
};

/**
 * Separete flash messages from global state and get as props to child component
 * @param state
 */
function mapStateToProps(state) {
    return {
        messages: state.flashMessages,
    }
}

export default connect(mapStateToProps, {deleteFlashMessage})(FlashMessageList);