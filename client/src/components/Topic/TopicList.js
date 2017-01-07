import React, {Component} from 'react';

import TopicLink from '../Topic/TopicLink';


/**
 * TopicList component
 */
class TopicList extends Component {

    constructor(props) {
        super(props);

        // component state
        this.state = {
            topics: [],
        }
    }


    componentDidMount() {
        const {boardIdentifier} = this.props;

        // load all categories from DB server via API
        this.props.getAllTopicsInBoardById(boardIdentifier).then(res => {
            let topics = this.state.topics;

            if (res.data.topics) {
                topics = res.data.topics;
                this.setState({topics});
            }
        });
    }


    render() {

        const {getPostsCountInTopicById, getUserById} = this.props;

        let topicList = this.state.topics.map(topic =>
            <TopicLink
                key={topic.id}
                topic={topic}
                getUserById={getUserById}
                getPostsCountInTopicById={getPostsCountInTopicById} />
        );

        return (
            <div>
                {topicList}
            </div>
        );
    }
}

TopicList.PropTypes = {
    boardIdentifier: React.PropTypes.number.isRequired,
    getAllTopicsInBoardById: React.PropTypes.func.isRequired,
    getPostsCountInTopicById: React.PropTypes.func.isRequired,
    getUserById: React.PropTypes.func.isRequired,
};

export default TopicList;