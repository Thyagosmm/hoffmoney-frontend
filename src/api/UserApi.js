import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8085/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const registerUser = (userData) => {
    return api.post('/usuario', userData);
};
