import axios from 'axios';

export function createTopic(topic) {
    return dispatch => {
        return axios.post('/api/topic', topic);
    };
}

export function getAllTopicsInBoardById(identifier) {
    return dispatch => {
        return axios.get(`/api/topic/${identifier}`);
    }
}

export function getTopicById(identifier) {
    return dispatch => {
        return axios.get(`/api/topic/id/${identifier}`);
    }
}
