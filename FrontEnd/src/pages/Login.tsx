import React, { useState } from 'react';
import { Layout, Form, Input, Button, Card, Row, Col, Space, Typography, Alert } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';

const { Content } = Layout;
const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const { login, loading, error } = useAuth();
  const { showError } = useUI();

  const handleSubmit = async (values) => {
    try {
      await login(values.email, values.password);
      const from = location.state?.from || '/';
      navigate(from);
    } catch (err) {
      showError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Layout>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '24px',
          background: '#f0f2f5',
        }}
      >
        <Card style={{ width: '100%', maxWidth: '400px' }}>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <div style={{ textAlign: 'center' }}>
              <Title level={2} style={{ margin: 0 }}>
                🛒 AskCart
              </Title>
              <Text type="secondary">Welcome back!</Text>
            </div>

            {error && <Alert message={error} type="error" showIcon />}

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input
                  placeholder="your@email.com"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please enter your password' },
                  { min: 6, message: 'Password must be at least 6 characters' },
                ]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  block
                  size="large"
                  htmlType="submit"
                  loading={loading}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>

            <div style={{ textAlign: 'center' }}>
              <Text>Don't have an account? </Text>
              <Button
                type="link"
                onClick={() => navigate('/register')}
                style={{ padding: 0 }}
              >
                Register here
              </Button>
            </div>

            <Button block onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </Space>
        </Card>
      </Content>
    </Layout>
  );
};

export default Login;
