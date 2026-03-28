import axiosClient from '../infrastructure/axiosClient';

const API = axiosClient;

export const getOriginalUrl = (code) => API.get(`/${code}`);
export const createShortLink = (data) => API.post('/api/shortlink/shorten', data);
export const me = () => API.get('/api/user/me');