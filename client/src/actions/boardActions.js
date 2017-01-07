import axios from 'axios';

export function createBoard(board) {
    return dispatch => {
        return axios.post('/api/board', board);
    };
}

export function getAllBoardsInCategoryById(identifier) {
    return dispatch => {
        return axios.get(`/api/board/${identifier}`);
    }
}

export function getBoardById(identifier) {
    return dispatch => {
        return axios.get(`/api/board/id/${identifier}`);
    }
}