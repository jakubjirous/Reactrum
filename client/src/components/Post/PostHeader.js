import React, {Component} from 'react';
import {Link} from 'react-router';
import changeCase from 'change-case';


/**
 * PostHeader component
 */
class PostHeader extends Component {


    constructor(props) {
        super(props);

        // component state
        this.state = {
            board: '',
            topic: ''
        };
    }


    componentDidMount() {
        const {boardIdentifier, topicIdentifier} = this.props;

        this.props.getBoardById(boardIdentifier).then(res => {
            let board = this.state.board;

            if (res.data.board) {
                board = res.data.board;
                this.setState({board});
            }
        });

        this.props.getTopicById(topicIdentifier).then(res => {
            let topic = this.state.topic;

            if (res.data.topic) {
                topic = res.data.topic;
                this.setState({topic});
            }
        });
    }


    render() {
        const {boardIdentifier} = this.props;
        const {board, topic} = this.state;

        return (
            <div>
                <h3>
                    <Link to={`/boards`}>
                        Boards
                    </Link>
                    <small>
                        <i className="fa fa-chevron-right">&nbsp;</i>
                    </small>
                    <Link to={`/board/${boardIdentifier}`}>
                        {changeCase.upperCaseFirst(board.title)}
                    </Link>
                    <small>
                        <i className="fa fa-chevron-right">&nbsp;</i>
                    </small>
                    {changeCase.upperCaseFirst(topic.title)}
                </h3>
            </div>
        )
    }
}

PostHeader.propTypes = {
    boardIdentifier: React.PropTypes.number.isRequired,
    topicIdentifier: React.PropTypes.number.isRequired,
    getBoardById: React.PropTypes.func.isRequired,
    getTopicById: React.PropTypes.func.isRequired
};

export default PostHeader;