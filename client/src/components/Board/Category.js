import React, {Component} from 'react';

import BoardLink from '../Board/BoardLink';


/**
 * Category component
 */
class Category extends Component {

    constructor(props) {
        super(props);

        // component state
        this.state = {
            boards: [],
        }
    }


    componentDidMount() {

        const {id} = this.props.category;

        // load all boards in category by ID from DB server via API
        this.props.getAllBoardsInCategoryById(id).then(res => {
            let boards = this.state.boards;

            if (res.data.boards) {
                boards = res.data.boards;
                this.setState({boards});
            }
        });
    }

    render() {

        const {title} = this.props.category;

        const boardList = this.state.boards.map(board =>
            <BoardLink key={board.id} board={board}/>
        );

        return (
            <div className="card card-block">
                <h4 className="card-title">{title}</h4>
                {boardList}
            </div>
        );
    }

}

Category.PropTypes = {
    category: React.PropTypes.object.isRequired,
    getAllBoardsInCategoryById: React.PropTypes.func.isRequired
};

export default Category;