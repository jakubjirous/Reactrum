import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../actions/types';
import shortid from 'shortid';
import findIndex from 'lodash/findIndex';

export default (state = [], action = {}) => {

    switch(action.type) {

        case ADD_FLASH_MESSAGE:
            return [
                ...state,
                {
                    id: shortid.generate(),     // generate unique id by shortid
                    type: action.message.type,
                    text: action.message.text
                }
            ];


        case DELETE_FLASH_MESSAGE:
            // index of flashMessage found in global state
            const index = findIndex(state, {id: action.id });

            if(index >= 0) {
                // excluded found element
                return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ]
            }
            return state;


        default:
            return state;
    }

}