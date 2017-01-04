import React, {Component} from 'react';


/**
 * Category component
 */
class Category extends Component {

    render() {

        const {id, title} = this.props.category;

        return (
            <div>
                <h3>{title}</h3>
            </div>
        );
    }

}

Category.PropTypes = {
    category: React.PropTypes.object.isRequired,
};

export default Category;