import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getBoardById} from '../../actions/boardActions';
import {getTopicById} from '../../actions/topicActions';
import {getAllPostsInTopicById} from '../../actions/postActions';
import {getUserById} from '../../actions/signupActions';
import {Link} from 'react-router';


import PostHeader from '../Post/PostHeader';
import PostList from '../Post/PostList';


/**
 * PostPage component
 */
class PostPage extends Component {

    constructor(props) {
        super(props);

        // component state
        this.state = {
            boardIdentifier: parseInt(this.props.location.pathname.split('/')[2], 10),
            topicIdentifier: parseInt(this.props.location.pathname.split('/')[4], 10),
        };
    }

    render() {

        const {getAllPostsInTopicById, getBoardById, getTopicById, getUserById} = this.props;
        const {boardIdentifier, topicIdentifier} = this.state;

        return (
            <div className="container">

                <PostHeader
                    boardIdentifier={boardIdentifier}
                    topicIdentifier={topicIdentifier}
                    getBoardById={getBoardById}
                    getTopicById={getTopicById} />

                <PostList
                    topicIdentifier={topicIdentifier}
                    getAllPostsInTopicById={getAllPostsInTopicById}
                    getUserById={getUserById} />

                <Link to={`/post-create/${boardIdentifier}/${topicIdentifier}`} className="btn btn-primary btn-create">Create new post</Link>
            </div>
        )
    }
}

PostPage.propTypes = {
    getAllPostsInTopicById: React.PropTypes.func.isRequired,
    boardIdentifier: React.PropTypes.number.isRequired,
    topicIdentifier: React.PropTypes.number.isRequired,
    getBoardById: React.PropTypes.func.isRequired,
    getTopicById: React.PropTypes.func.isRequired
};

export default connect(null, {getAllPostsInTopicById, getBoardById, getTopicById, getUserById})(PostPage);