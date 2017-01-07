import React, {Component} from 'react';
import {Link} from 'react-router';
import changeCase from 'change-case';


/**
 * TopicLink component
 */
class TopicLink extends Component {

    constructor(props) {
        super(props);

        // component state
        this.state = {
            username: '',
            count: 0
        }
    }

    componentDidMount() {
        const userIdentifier = this.props.topic.user_id;
        const topicIdentifier = this.props.topic.id;

        // load all categories from DB server via API
        this.props.getUserById(userIdentifier).then(res => {
            let username = this.state.username;

            if (res.data.user) {
                username = res.data.user.username;
                this.setState({username});
            }
        });


        // load posts count in topic from DB server via API
        this.props.getPostsCountInTopicById(topicIdentifier).then(res => {
            let count = this.state.count;

            if (res.data.count) {
                count = res.data.count;
                this.setState({count});
            }
        });


    }

    render() {

        const {id, title, board_id, created_at} = this.props.topic;
        const {username, count} = this.state;

        let date = new Date(created_at);

        return (
            <div className="card card-block">
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-3 text-xs-center text-sm-left text-md-left">
                        <Link to={`/board/${board_id}/topic/${id}`} className="card-link">
                            {changeCase.upperCaseFirst(title)}
                        </Link>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-3 text-xs-center text-sm-center">
                        <Link to={`/board/${board_id}/topic/${id}`} className="card-link">
                            <i className="fa fa-comments">&nbsp;</i> {count}
                        </Link>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-3 text-xs-center text-sm-left text-md-center">
                        <small>
                            <i className="fa fa-user">&nbsp;</i> {username}
                        </small>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-3 text-xs-center text-sm-center text-md-right">
                        <small>
                            <i className="fa fa-calendar">&nbsp;</i> {date.toLocaleDateString('cs-CZ')} <i className="fa fa-clock-o">&nbsp;</i> {date.toLocaleTimeString('cs-CZ')}
                        </small>
                    </div>
                </div>
            </div>
        );
    }

}

TopicLink.PropTypes = {
    topic: React.PropTypes.object.isRequired,
    getUserById: React.PropTypes.func.isRequired,
    getPostsCountInTopicById: React.PropTypes.func.isRequired,
};

export default TopicLink;