import axiosInstance from './axiosInstance';

const AUTH_BASE = '/auth';

export const authAPI = {
  register: (userData) => {
    return axiosInstance.post(`${AUTH_BASE}/register`, userData);
  },

  login: (email, password) => {
    return axiosInstance.post(`${AUTH_BASE}/login`, { email, password });
  },

  me: () => {
    return axiosInstance.get(`${AUTH_BASE}/me`);
  },

  refresh: (refreshToken) => {
    return axiosInstance.post(`${AUTH_BASE}/refresh`, {
      refresh_token: refreshToken,
    });
  },

  logout: () => {
    return axiosInstance.post(`${AUTH_BASE}/logout`);
  },
};

export default authAPI;
