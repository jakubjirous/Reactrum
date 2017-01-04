import React, {Component} from 'react';
import {getAllCategories} from '../../actions/categoryActions';
import {connect} from 'react-redux';

import CategoryList from '../Board/CategoryList';

/**
 * BoardPage component
 */
class BoardPage extends Component {


    render() {

        const {getAllCategories} = this.props;

        return (
            <div className="container">
                <h2>Categories</h2>
                <CategoryList getAllCategories={getAllCategories} />
            </div>
        )
    }
}

BoardPage.propTypes = {
    getAllCategories: React.PropTypes.func.isRequired
};

export default connect(null, {getAllCategories})(BoardPage);