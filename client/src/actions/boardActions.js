import axios from 'axios';

export function createBoard(board) {
    return dispatch => {
        return axios.post('/api/board', board);
    };
}