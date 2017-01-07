import React, {Component} from 'react';
import {Link} from 'react-router';
import changeCase from 'change-case';


/**
 * TopicHeader component
 */
class TopicHeader extends Component {


    constructor(props) {
        super(props);

        // component state
        this.state = {
            board: '',
        };
    }


    componentDidMount() {
        const {boardIdentifier} = this.props;

        this.props.getBoardById(boardIdentifier).then(res => {
            let board = this.state.board;

            if (res.data.board) {
                board = res.data.board;
                this.setState({board});
            }
        });
    }


    render() {

        const {title} = this.state.board;

        return (
            <div>
                <h3>
                    <Link to={`/boards`}>
                        Boards
                    </Link>
                    <small>
                        <i className="fa fa-chevron-right">&nbsp;</i>
                    </small>
                    {changeCase.upperCaseFirst(title)}
                </h3>
            </div>
        )
    }
}

TopicHeader.propTypes = {
    boardIdentifier: React.PropTypes.number.isRequired,
    getBoardById: React.PropTypes.func.isRequired
};

export default TopicHeader;