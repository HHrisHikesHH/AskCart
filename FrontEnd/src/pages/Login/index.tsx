import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './styles.css';

const { Title, Text } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      await login(values.username, values.password);
      message.success('Login successful!');
      navigate('/home');
    } catch (error) {
      message.error('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-overlay" />
      </div>
      
      <Card className="auth-card" bordered={false}>
        <div className="auth-header">
          <Title level={2} className="auth-title">
            Welcome Back
          </Title>
          <Text className="auth-subtitle">
            Sign in to continue to AskCart
          </Text>
        </div>

        <Form
          name="login"
          onFinish={onFinish}
          size="large"
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input
              prefix={<UserOutlined className="input-icon" />}
              placeholder="Username"
              className="auth-input"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="input-icon" />}
              placeholder="Password"
              className="auth-input"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="auth-button"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <div className="auth-footer">
          <Text className="auth-footer-text">
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Sign up
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
}
