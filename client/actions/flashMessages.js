import { ADD_FLASH_MESSAGE } from './types';

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