import axios from 'axios';

const API = axios.create({
    baseURL: 'https://shortlink.io.vn'
});

export const getOriginalUrl = (code) => API.get(`/${code}`);
export const createShortLink = (data) => API.post('/api/shortlink/shorten', data);