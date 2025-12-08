import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../Login/styles.css';

const { Title, Text } = Typography;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; email: string; password: string }) => {
    setLoading(true);
    try {
      await register(values);
      message.success('Registration successful! Welcome to AskCart');
      navigate('/home');
    } catch (error) {
      message.error('Registration failed. Username or email may already exist.');
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
            Create Account
          </Title>
          <Text className="auth-subtitle">
            Join AskCart and start shopping smarter
          </Text>
        </div>

        <Form
          name="register"
          onFinish={onFinish}
          size="large"
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Please enter your username' },
              { min: 3, message: 'Username must be at least 3 characters' }
            ]}
          >
            <Input
              prefix={<UserOutlined className="input-icon" />}
              placeholder="Username"
              className="auth-input"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input
              prefix={<MailOutlined className="input-icon" />}
              placeholder="Email"
              className="auth-input"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="input-icon" />}
              placeholder="Password"
              className="auth-input"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="input-icon" />}
              placeholder="Confirm Password"
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
              Create Account
            </Button>
          </Form.Item>
        </Form>

        <div className="auth-footer">
          <Text className="auth-footer-text">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
}
