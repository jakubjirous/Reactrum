import axios from 'axios';
import { SET_CATEGORIES } from './types';


export function setCategories(categories) {
    return {
        type: SET_CATEGORIES,
        categories
    }
}


export function getAllCategories() {
    return dispatch => {
        return axios.get('/api/category'); /*.then(res => {

            // get categories from response
            const categories = res.categories;

            console.log(categories);

            dispatch(setCategories(categories));
        });*/
    }
}