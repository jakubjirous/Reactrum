import { SET_CATEGORIES } from '../actions/types';

const initialState = {
    categories: {}
};

export default (state = initialState, action = {}) => {

    switch (action.type) {

        case SET_CATEGORIES:
            return {
                categories: action.categories
            };

        default:
            return state;
    }
}