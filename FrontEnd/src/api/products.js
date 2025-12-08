import axiosInstance from './axiosInstance';

const PRODUCTS_BASE = '/products';

export const productsAPI = {
  getAll: (params = {}) => {
    return axiosInstance.get(PRODUCTS_BASE, { params });
  },

  getById: (id) => {
    return axiosInstance.get(`${PRODUCTS_BASE}/${id}`);
  },

  create: (productData) => {
    return axiosInstance.post(PRODUCTS_BASE, productData);
  },

  update: (id, productData) => {
    return axiosInstance.put(`${PRODUCTS_BASE}/${id}`, productData);
  },

  delete: (id) => {
    return axiosInstance.delete(`${PRODUCTS_BASE}/${id}`);
  },

  search: (query) => {
    return axiosInstance.get(`${PRODUCTS_BASE}/search`, {
      params: { q: query },
    });
  },
};

export default productsAPI;
