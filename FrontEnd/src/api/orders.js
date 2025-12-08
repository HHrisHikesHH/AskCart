import axiosInstance from './axiosInstance';

const ORDERS_BASE = '/orders';

export const ordersAPI = {
  create: (orderData) => {
    return axiosInstance.post(ORDERS_BASE, orderData);
  },

  getByUser: () => {
    return axiosInstance.get(ORDERS_BASE);
  },

  getById: (id) => {
    return axiosInstance.get(`${ORDERS_BASE}/${id}`);
  },

  cancel: (id) => {
    return axiosInstance.post(`${ORDERS_BASE}/${id}/cancel`);
  },
};

export default ordersAPI;
