import type { ReactNode, FC } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import { message, Spin } from 'antd';

interface UIContextType {
  isLoading: boolean;
  loadingMessage: string;
  showLoader: (msg?: string) => void;
  hideLoader: () => void;
  showToast: (msg: string, type?: string, duration?: number) => void;
  showError: (msg: string, duration?: number) => void;
  showSuccess: (msg: string, duration?: number) => void;
  showInfo: (msg: string, duration?: number) => void;
  showWarning: (msg: string, duration?: number) => void;
}

const UIContext = createContext<UIContextType | null>(null);

interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider: FC<UIProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');

  const showLoader = useCallback((msg = 'Loading...') => {
    setLoadingMessage(msg);
    setIsLoading(true);
  }, []);

  const hideLoader = useCallback(() => {
    setIsLoading(false);
  }, []);

  const showToast = useCallback((msg, type = 'success', duration = 3) => {
    message[type](msg, duration);
  }, []);

  const showError = useCallback((msg, duration = 3) => {
    message.error(msg, duration);
  }, []);

  const showSuccess = useCallback((msg, duration = 3) => {
    message.success(msg, duration);
  }, []);

  const showInfo = useCallback((msg, duration = 3) => {
    message.info(msg, duration);
  }, []);

  const showWarning = useCallback((msg, duration = 3) => {
    message.warning(msg, duration);
  }, []);

  const value = {
    isLoading,
    loadingMessage,
    showLoader,
    hideLoader,
    showToast,
    showError,
    showSuccess,
    showInfo,
    showWarning,
  };

  return (
    <UIContext.Provider value={value}>
      {children}
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
        >
          <Spin size="large" tip={loadingMessage} />
        </div>
      )}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within UIProvider');
  }
  return context;
};

export default UIContext;
