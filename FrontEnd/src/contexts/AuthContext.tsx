import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../utils/api';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      console.log('[AuthContext] checkAuth: Fetching /auth/me');
      const response = await api.get('/auth/me');
      console.log('[AuthContext] checkAuth: Response received:', response.data);
      setUser(response.data);
    } catch (error) {
      console.error('[AuthContext] checkAuth: Failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Restore token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    console.log('[AuthContext] Login attempt for:', username);
    const response = await api.post('/auth/login', { username, password });
    console.log('[AuthContext] Login response:', response.data);
    
    if (response.data.status === 'success') {
      // Manual token fallback mechanism
      const token = response.data.data?.token;
      console.log('[AuthContext] Extracted token:', token ? 'Present' : 'Missing');
      
      if (token) {
         // Default to Bearer scheme
         api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
         localStorage.setItem('token', token);
         console.log('[AuthContext] Token saved to localStorage and header set');
      }
      
      console.log('[AuthContext] Calling checkAuth...');
      await checkAuth(); // Fetch user data after login
      console.log('[AuthContext] checkAuth completed');
    } else {
      throw new Error('Login failed');
    }
  };

  const register = async (username: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { username, email, password });
    if (response.data.status === 'success') {
      // Auto-login after registration
      await login(username, password);
    } else {
      throw new Error('Registration failed');
    }
  };

  const logout = async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
