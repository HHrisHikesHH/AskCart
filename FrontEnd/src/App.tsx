import { ConfigProvider, theme } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { UIProvider } from "./contexts/UIContext";
import Router from "./router";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#667eea',
          borderRadius: 8,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial',
        },
      }}
    >
      <UIProvider>
        <AuthProvider>
          <CartProvider>
            <QueryClientProvider client={queryClient}>
              <Router />
            </QueryClientProvider>
          </CartProvider>
        </AuthProvider>
      </UIProvider>
    </ConfigProvider>
  );
}

export default App;
