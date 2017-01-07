import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllTopicsInBoardById} from '../../actions/topicActions';
import {getPostsCountInTopicById} from '../../actions/postActions';
import {getBoardById} from '../../actions/boardActions';
import {getUserById} from '../../actions/signupActions';
import {Link} from 'react-router';


import TopicHeader from '../Topic/TopicHeader';
import TopicList from '../Topic/TopicList';


/**
 * TopicPage component
 */
class TopicPage extends Component {

    constructor(props) {
        super(props);

        // component state
        this.state = {
            boardIdentifier: parseInt(this.props.location.pathname.split('/')[2], 10),
        };
    }

    render() {

        const {getAllTopicsInBoardById, getPostsCountInTopicById, getBoardById, getUserById} = this.props;
        const {boardIdentifier} = this.state;

        return (
            <div className="container">

                <TopicHeader
                    boardIdentifier={boardIdentifier}
                    getBoardById={getBoardById} />

                <TopicList
                    boardIdentifier={boardIdentifier}
                    getAllTopicsInBoardById={getAllTopicsInBoardById}
                    getPostsCountInTopicById={getPostsCountInTopicById}
                    getUserById={getUserById} />

                <Link to={`/topic-create/${boardIdentifier}`} className="btn btn-primary btn-create">Create new topic</Link>

            </div>
        )
    }
}

TopicPage.propTypes = {
    getAllTopicsInBoardById: React.PropTypes.func.isRequired,
    getPostsCountInTopicById: React.PropTypes.func.isRequired,
    getBoardById: React.PropTypes.func.isRequired,
    getUserById: React.PropTypes.func.isRequired,
};

export default connect(null, {
    getAllTopicsInBoardById,
    getPostsCountInTopicById,
    getBoardById,
    getUserById
})(TopicPage);