import axios from 'axios';

export function createPost(post) {
    return dispatch => {
        return axios.post('/api/post', post);
    };
}

export function getAllPostsInTopicById(identifier) {
    return dispatch => {
        return axios.get(`/api/post/${identifier}`);
    }
}

export function getPostsCountInTopicById(identifier) {
    return dispatch => {
        return axios.get(`/api/post/count/${identifier}`);
    }
}