import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './types';


export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}


export function login(data) {
    return dispatch => {
        return axios.post('/api/auth', data).then(res => {

            // get token from response
            const token = res.data.token;

            // save token to localStorage
            localStorage.setItem('jwtToken', token);

            setAuthorizationToken(token);

            // token decoding and save to redux store
            dispatch(setCurrentUser(jwtDecode(token)));

        });
    }
}


export function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}