import React, {Component} from 'react';
import {connect} from 'react-redux';

import BoardCreateForm from './BoardCreateForm';
import {createBoard} from '../../actions/boardActions';
import {getAllCategories} from '../../actions/categoryActions';
import {addFlashMessage} from '../../actions/flashMessages';


/**
 * BoardCreatePage component
 */
class BoardCreatePage extends Component {

    render() {

        const {createBoard, getAllCategories, addFlashMessage} = this.props;

        return (
            <div>
                <BoardCreateForm
                    createBoard={createBoard}
                    getAllCategories={getAllCategories}
                    addFlashMessage={addFlashMessage} />
            </div>
        )
    }
}

BoardCreatePage.propTypes = {
    createBoard: React.PropTypes.func.isRequired,
    getAllCategories: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
};

export default connect(null, {createBoard, getAllCategories, addFlashMessage})(BoardCreatePage);