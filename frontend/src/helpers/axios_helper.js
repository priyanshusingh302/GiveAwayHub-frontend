import axios from 'axios';

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
    window.localStorage.setItem('auth_token', token);
};

export const removeAuthToken = () => {
    window.localStorage.removeItem('auth_token');
}

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = async (method, url, data) => {

    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = { 'Authorization': `Bearer ${getAuthToken()}` };
    }

    try {
        const response = await axios({
            method: method,
            url: url,
            headers: headers,
            data: data
        });
        return { success: true, data: response.data };
    }
    catch (err) {
        console.log(err);
        if (err.response.data?.message ===  "Unauthorized path") {
            removeAuthToken();
            window.localStorage.removeItem('user');
            window.location.href = 'http://localhost:3000/login';
        }
        return { success: false, data: {} };
    }
};