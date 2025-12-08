import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Layout, Result, Button, Card, Row, Col, Space, Typography } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const OrderConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <Result
          status="success"
          title="Order Placed Successfully!"
          subTitle={`Your order ID: ${id}`}
          extra={[
            <Button
              type="primary"
              key="orders"
              onClick={() => navigate('/orders')}
            >
              View My Orders
            </Button>,
            <Button key="home" onClick={() => navigate('/')}>
              Back to Home
            </Button>,
          ]}
          style={{ marginTop: '32px', marginBottom: '32px' }}
        />

        <Row gutter={[24, 24]} style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Col xs={24}>
            <Card title="What's Next?">
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Title level={5}>Order Confirmation</Title>
                  <Paragraph>
                    A confirmation email has been sent to your registered email address.
                  </Paragraph>
                </div>

                <div>
                  <Title level={5}>Tracking Your Order</Title>
                  <Paragraph>
                    You can track your order status on the{' '}
                    <Text strong>My Orders</Text> page.
                  </Paragraph>
                </div>

                <div>
                  <Title level={5}>Need Help?</Title>
                  <Paragraph>
                    Contact our support team if you have any questions about your order.
                  </Paragraph>
                </div>
              </Space>
            </Card>
          </Col>

          <Col xs={24}>
            <Card title="Order Details">
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Text strong>Order ID:</Text>
                  <Text style={{ marginLeft: '8px' }}>{id}</Text>
                </div>
                <div>
                  <Text strong>Status:</Text>
                  <Text style={{ marginLeft: '8px', color: '#52c41a' }}>
                    Processing
                  </Text>
                </div>
                <div>
                  <Text strong>Estimated Delivery:</Text>
                  <Text style={{ marginLeft: '8px' }}>
                    {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </Text>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default OrderConfirmation;
