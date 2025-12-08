import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Layout, Form, Input, Button, Card, Space, Typography, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';

const { Content } = Layout;
const { Title, Text } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { register, loading, error } = useAuth();
  const { showError } = useUI();

  const handleSubmit = async (values) => {
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      navigate('/');
    } catch (err) {
      showError(err.response?.data?.message || 'Registration failed');
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
              <Text type="secondary">Create your account</Text>
            </div>

            {error && <Alert message={error} type="error" showIcon />}

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[
                  { required: true, message: 'Please enter your full name' },
                  { min: 2, message: 'Name must be at least 2 characters' },
                ]}
              >
                <Input
                  placeholder="John Doe"
                  size="large"
                />
              </Form.Item>

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
                  { required: true, message: 'Please enter a password' },
                  { min: 6, message: 'Password must be at least 6 characters' },
                ]}
              >
                <Input.Password
                  placeholder="Enter a strong password"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Please confirm your password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('Passwords do not match')
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Confirm your password"
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
                  Register
                </Button>
              </Form.Item>
            </Form>

            <div style={{ textAlign: 'center' }}>
              <Text>Already have an account? </Text>
              <Button
                type="link"
                onClick={() => navigate('/login')}
                style={{ padding: 0 }}
              >
                Login here
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

export default Register;
