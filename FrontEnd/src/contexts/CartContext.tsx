import type { ReactNode, FC } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import cartAPI from '../api/cart';
import { useUI } from './UIContext';

interface CartContextType {
  items: any[];
  itemCount: number;
  total: number;
  loading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity: number) => Promise<any>;
  updateItem: (itemId: string, quantity: number) => Promise<any>;
  removeItem: (itemId: string) => Promise<any>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showError } = useUI();

  const calculateTotal = useCallback((cartItems) => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, []);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await cartAPI.getCart();
      setItems(response.data.items || []);
    } catch (err) {
      console.error('Fetch cart error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = useCallback(async (productId, quantity = 1) => {
    setLoading(true);
    try {
      const response = await cartAPI.addItem(productId, quantity);
      setItems(response.data.items || []);
      return response.data;
    } catch (err) {
      showError('Failed to add item to cart');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const updateItem = useCallback(async (itemId, quantity) => {
    setLoading(true);
    try {
      const response = await cartAPI.updateItem(itemId, quantity);
      setItems(response.data.items || []);
      return response.data;
    } catch (err) {
      showError('Failed to update cart item');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const removeItem = useCallback(async (itemId) => {
    setLoading(true);
    try {
      const response = await cartAPI.removeItem(itemId);
      setItems(response.data.items || []);
      return response.data;
    } catch (err) {
      showError('Failed to remove item from cart');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const clearCart = useCallback(async () => {
    setLoading(true);
    try {
      await cartAPI.clearCart();
      setItems([]);
    } catch (err) {
      showError('Failed to clear cart');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const itemCount = items.length;
  const total = calculateTotal(items);

  const value = {
    items,
    itemCount,
    total,
    loading,
    error,
    fetchCart,
    addItem,
    updateItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export default CartContext;
