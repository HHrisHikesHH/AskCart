import axiosInstance from './axiosInstance';

const AI_BASE = '/ai';

export const aiAPI = {
  chat: (message, productId = null) => {
    return axiosInstance.post(`${AI_BASE}/chat`, {
      message,
      product_id: productId,
    });
  },

  getHistory: () => {
    return axiosInstance.get(`${AI_BASE}/history`);
  },

  clearHistory: () => {
    return axiosInstance.delete(`${AI_BASE}/history`);
  },
};

export default aiAPI;
