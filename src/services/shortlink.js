import axiosClient from '../infrastructure/axiosClient';

const API = axiosClient;

export const getOriginalUrl = (code) => API.get(`/${code}`);
export const createShortLink = (data) => API.post('/api/shortlink/shorten', data);
export const me = () => API.get('/api/user/me');
export const getHistory = (page, size, sort) => API.get('/api/shortlink/history', { params: { page, size, sort } });
export const logout = () => API.post("/api/logout");