import axiosInstance from './axiosInstance';

const CART_BASE = '/cart';

export const cartAPI = {
  getCart: () => {
    return axiosInstance.get(CART_BASE);
  },

  addItem: (productId, quantity = 1) => {
    return axiosInstance.post(`${CART_BASE}/items`, {
      product_id: productId,
      quantity,
    });
  },

  updateItem: (itemId, quantity) => {
    return axiosInstance.put(`${CART_BASE}/items/${itemId}`, {
      quantity,
    });
  },

  removeItem: (itemId) => {
    return axiosInstance.delete(`${CART_BASE}/items/${itemId}`);
  },

  clearCart: () => {
    return axiosInstance.delete(CART_BASE);
  },
};

export default cartAPI;
