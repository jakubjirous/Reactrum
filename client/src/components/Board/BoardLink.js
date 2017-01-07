import React, {Component} from 'react';
import {Link} from 'react-router';
import changeCase from 'change-case';


/**
 * BoardLink component
 */
class BoardLink extends Component {

    render() {

        const {id, title} = this.props.board;

        return (
            <h5>
                <Link to={`/board/${id}`} className="card-link">
                    <strong>{changeCase.upperCaseFirst(title)}</strong>
                </Link>
            </h5>
        );
    }

}

BoardLink.PropTypes = {
    board: React.PropTypes.object.isRequired,
};

export default BoardLink;