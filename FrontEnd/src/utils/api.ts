import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios interceptor for automatic token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't retry on these endpoints to avoid infinite loops
    const noRetryEndpoints = ['/auth/me', '/auth/refresh', '/auth/login', '/auth/register'];
    const isNoRetryEndpoint = noRetryEndpoints.some(endpoint => 
      originalRequest.url?.includes(endpoint)
    );

    // If 401 and haven't retried yet, and not a no-retry endpoint, try to refresh
    if (error.response?.status === 401 && !originalRequest._retry && !isNoRetryEndpoint) {
      originalRequest._retry = true;

      try {
        await api.post('/auth/refresh');
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, just reject - let the component handle it
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
