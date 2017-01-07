import React, {Component} from 'react';


import PostText from '../Post/PostText';


/**
 * PostList component
 */
class PostList extends Component {

    constructor(props) {
        super(props);

        // component state
        this.state = {
            posts: [],
        }
    }


    componentDidMount() {
        const {topicIdentifier} = this.props;

        // load posts in topic by ID from DB server via API
        this.props.getAllPostsInTopicById(topicIdentifier).then(res => {
            let posts = this.state.posts;

            if (res.data.posts) {
                posts = res.data.posts;
                this.setState({posts});
            }
        });
    }


    render() {

        const {getUserById} = this.props;

        let postList = this.state.posts.map(post =>
            <PostText
                key={post.id}
                post={post}
                getUserById={getUserById} />
        );

        return (
            <div>
                {postList}
            </div>
        );
    }
}

PostList.PropTypes = {
    topicIdentifier: React.PropTypes.number.isRequired,
    getAllPostsInTopicById: React.PropTypes.func.isRequired,
    getUserById: React.PropTypes.func.isRequired,
};

export default PostList;