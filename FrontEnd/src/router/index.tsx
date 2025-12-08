import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

// Pages
import Landing from '../pages/Landing';
import ProductList from '../pages/ProductList';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderConfirmation from '../pages/OrderConfirmation';
import Orders from '../pages/Orders';
import AIChat from '../pages/AIChat';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';

// Components
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProtectedRoute from '../components/layout/ProtectedRoute';

const { Content } = Layout;

const Router = () => {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Content style={{ flex: 1 }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Public but cart related */}
            <Route path="/cart" element={<Cart />} />

            {/* Protected Routes */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-confirmation/:id"
              element={
                <ProtectedRoute>
                  <OrderConfirmation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route path="/ai" element={<AIChat />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Catch all */}
            <Route
              path="*"
              element={
                <div style={{ padding: '24px', textAlign: 'center' }}>
                  <h1>404 - Page Not Found</h1>
                </div>
              }
            />
          </Routes>
        </Content>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
