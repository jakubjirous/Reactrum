import React, {Component} from 'react';
import {getAllCategories} from '../../actions/categoryActions';
import {getAllBoardsInCategoryById} from '../../actions/boardActions';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import CategoryList from '../Board/CategoryList';

/**
 * BoardPage component
 */
class BoardPage extends Component {


    render() {

        const {getAllCategories, getAllBoardsInCategoryById} = this.props;

        return (
            <div className="container">
                <CategoryList
                    getAllCategories={getAllCategories}
                    getAllBoardsInCategoryById={getAllBoardsInCategoryById} />

                <Link to={`/board-create`} className="btn btn-primary btn-create">Create new board</Link>
            </div>
        )
    }
}

BoardPage.propTypes = {
    getAllCategories: React.PropTypes.func.isRequired,
    getAllBoardsInCategoryById: React.PropTypes.func.isRequired
};

export default connect(null, {getAllCategories, getAllBoardsInCategoryById})(BoardPage);