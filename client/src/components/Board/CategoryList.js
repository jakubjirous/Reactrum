import React, {Component} from 'react';

import Category from '../Board/Category';


/**
 * CategoryList component
 */
class CategoryList extends Component {

    constructor(props) {
        super(props);

        // component state
        this.state = {
            categories: []
        }
    }


    componentDidMount() {

        // load all categories from DB server via API
        this.props.getAllCategories().then(res => {
            let categories = this.state.categories;

            if (res.data.categories) {
                categories = res.data.categories;
                this.setState({categories});
            }
        });
    }


    render() {

        const {getAllBoardsInCategoryById} = this.props;

        const categoryList = this.state.categories.map(category =>
            <Category key={category.id} category={category} getAllBoardsInCategoryById={getAllBoardsInCategoryById} />
        );

        return (
            <div>
                {categoryList}
            </div>
        );
    }
}

CategoryList.PropTypes = {
    getAllCategories: React.PropTypes.func.isRequired,
    getAllBoardsInCategoryById: React.PropTypes.func.isRequired
};

export default CategoryList;