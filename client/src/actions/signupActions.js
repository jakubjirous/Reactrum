import axios from 'axios';

/**
 * User sign up request
 * @param userData
 * @returns {function(*)}
 */
export function userSignupRequest(userData) {
    return dispatch => {
        return axios.post('/api/users', userData);
    }
}

/**
 * Check if user exists
 * @param identifier
 * @returns {function(*)}
 */
export function isUserExists(identifier) {
    return dispatch => {
        return axios.get(`/api/users/${identifier}`);
    }
}

/**
 * Ge user by ID
 * @param identifier
 * @returns {function(*)}
 */
export function getUserById(identifier) {
    return dispatch => {
        return axios.get(`/api/users/id/${identifier}`);
    }
}