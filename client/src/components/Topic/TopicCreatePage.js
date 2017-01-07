import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createTopic} from '../../actions/topicActions';
import {addFlashMessage} from '../../actions/flashMessages';


import TopicCreateForm from '../Topic/TopicCreateForm';


/**
 * TopicCreatePage component
 */
class TopicCreatePage extends Component {


    constructor(props) {
        super(props);

        // component state
        this.state = {
            boardIdentifier: parseInt(this.props.location.pathname.split('/')[2], 10),
        };
    }

    render() {

        const {user, createTopic, addFlashMessage} = this.props;
        const {boardIdentifier} = this.state;

        return (
            <div>
                <TopicCreateForm
                    user={user}
                    boardIdentifier={boardIdentifier}
                    createTopic={createTopic}
                    addFlashMessage={addFlashMessage} />
            </div>
        )
    }
}

TopicCreatePage.propTypes = {
    user: React.PropTypes.object.isRequired,
    createTopic: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps, { createTopic, addFlashMessage })(TopicCreatePage);