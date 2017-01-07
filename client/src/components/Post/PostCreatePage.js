import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createPost} from '../../actions/postActions';
import {addFlashMessage} from '../../actions/flashMessages';


import PostCreateForm from '../Post/PostCreateForm';


/**
 * PostCreatePage component
 */
class PostCreatePage extends Component {


    constructor(props) {
        super(props);

        // component state
        this.state = {
            boardIdentifier: parseInt(this.props.location.pathname.split('/')[2], 10),
            topicIdentifier: parseInt(this.props.location.pathname.split('/')[3], 10),
        };
    }

    render() {

        const {user, createPost, addFlashMessage} = this.props;
        const {boardIdentifier, topicIdentifier} = this.state;

        return (
            <div>
                <PostCreateForm
                    user={user}
                    boardIdentifier={boardIdentifier}
                    topicIdentifier={topicIdentifier}
                    createPost={createPost}
                    addFlashMessage={addFlashMessage} />
            </div>
        )
    }
}

PostCreatePage.propTypes = {
    user: React.PropTypes.object.isRequired,
    createPost: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps, { createPost, addFlashMessage })(PostCreatePage);