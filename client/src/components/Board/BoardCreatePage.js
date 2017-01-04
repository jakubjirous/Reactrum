import React, { Component } from 'react';
import {connect} from 'react-redux';

import BoardCreateForm from './BoardCreateForm';
import {getAllCategories} from '../../actions/categoryActions';
import { addFlashMessage } from '../../actions/flashMessages';


/**
 * BoardCreatePage component
 */
class BoardCreatePage extends Component {

    render() {

        const {getAllCategories} = this.props;

        return (
            <div>
                <BoardCreateForm
                    getAllCategories={getAllCategories}
                    addFlashMessage={addFlashMessage} />
            </div>
        )
    }
}

BoardCreatePage.propTypes = {
    getAllCategories: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
};

export default connect(null, {getAllCategories, addFlashMessage})(BoardCreatePage);