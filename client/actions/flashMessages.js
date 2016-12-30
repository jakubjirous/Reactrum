import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from './types';

/**
 * Action creator for adding flash messages
 * @param message
 * @returns {{type: *, message: *}}
 */
export function addFlashMessage(message) {
    return {
        type: ADD_FLASH_MESSAGE,
        message
    }
}


/**
 * Action creator for deleting flash messages
 * @param id
 * @returns {{type: *, id: *}}
 */
export function deleteFlashMessage(id) {
    return {
        type: DELETE_FLASH_MESSAGE,
        id
    }
}