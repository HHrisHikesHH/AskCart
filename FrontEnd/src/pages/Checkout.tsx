import React, { useState } from 'react';
import { Layout, Form, Input, Button, Card, Row, Col, Space, Typography, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useUI } from '../contexts/UIContext';
import { useAuth } from '../contexts/AuthContext';
import ordersAPI from '../api/orders';
import CartSummary from '../components/cart/CartSummary';

const { Content } = Layout;
const { Title, Text } = Typography;

const Checkout = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { items, total, clearCart } = useCart();
  const { showSuccess, showError } = useUI();
  const { user } = useAuth();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const orderData = {
        shipping_address: {
          street: values.street,
          city: values.city,
          state: values.state,
          zip: values.zip,
          country: values.country,
        },
        billing_address: values.sameAsShipping
          ? {
              street: values.street,
              city: values.city,
              state: values.state,
              zip: values.zip,
              country: values.country,
            }
          : {
              street: values.billingStreet,
              city: values.billingCity,
              state: values.billingState,
              zip: values.billingZip,
              country: values.billingCountry,
            },
        payment_method: 'credit_card', // Placeholder
        items: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const response = await ordersAPI.create(orderData);
      await clearCart();
      showSuccess('Order placed successfully!');
      navigate(`/order-confirmation/${response.data.id}`);
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <Content style={{ padding: '24px' }}>
          <Card>
            <Text>Your cart is empty. Please add items before checking out.</Text>
            <Button
              type="primary"
              onClick={() => navigate('/cart')}
              style={{ marginLeft: '12px' }}
            >
              Back to Cart
            </Button>
          </Card>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <Title level={2}>Checkout</Title>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Card title="Shipping Information">
              <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                  label="Full Name"
                  name="fullName"
                  rules={[{ required: true, message: 'Please enter full name' }]}
                >
                  <Input placeholder={user?.name} />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter email' },
                    { type: 'email', message: 'Invalid email' },
                  ]}
                >
                  <Input placeholder={user?.email} />
                </Form.Item>

                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[{ required: true, message: 'Please enter phone' }]}
                >
                  <Input />
                </Form.Item>

                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item
                      label="Street Address"
                      name="street"
                      rules={[{ required: true, message: 'Please enter street address' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="City"
                      name="city"
                      rules={[{ required: true, message: 'Please enter city' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="State/Province"
                      name="state"
                      rules={[{ required: true, message: 'Please enter state' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="ZIP/Postal Code"
                      name="zip"
                      rules={[{ required: true, message: 'Please enter ZIP' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Country"
                      name="country"
                      rules={[{ required: true, message: 'Please enter country' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name="sameAsShipping" valuePropName="checked" initialValue={true}>
                  <Checkbox>Billing address same as shipping</Checkbox>
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Place Order
                    </Button>
                    <Button onClick={() => navigate('/cart')}>Back to Cart</Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <CartSummary items={items} total={total} loading={loading} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Checkout;
