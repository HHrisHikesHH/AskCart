import React, { useState } from 'react';
import { Layout, Row, Col, Image, Space, Button, InputNumber, Card, Tabs, Spin, Empty, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import productsAPI from '../api/products';
import aiAPI from '../api/ai';
import { useCart } from '../contexts/CartContext';
import { useUI } from '../contexts/UIContext';
import Loader from '../components/common/Loader';
import MessageBubble from '../components/common/MessageBubble';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const { addItem } = useCart();
  const { showSuccess, showError } = useUI();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsAPI.getById(id).then((res) => res.data),
    enabled: !!id,
  });

  const handleAddToCart = async () => {
    try {
      await addItem(id, quantity);
      showSuccess(`Added ${quantity} item(s) to cart!`);
      setQuantity(1);
    } catch (err) {
      showError('Failed to add to cart');
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage;
    setInputMessage('');
    setMessages((prev) => [...prev, { text: userMsg, isUser: true }]);
    setChatLoading(true);

    try {
      const response = await aiAPI.chat(userMsg, id);
      setMessages((prev) => [
        ...prev,
        { text: response.data.response, isUser: false },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, I could not process that request.', isUser: false },
      ]);
      showError('Failed to send message');
    } finally {
      setChatLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <Content style={{ padding: '24px' }}>
          <Loader fullPage />
        </Content>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <Content style={{ padding: '24px' }}>
          <Empty description="Product not found" />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <Row gutter={[32, 32]}>
          {/* Product Image */}
          <Col xs={24} md={12}>
            <div
              style={{
                width: '100%',
                height: '400px',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                  preview
                />
              ) : (
                <Text type="secondary">No Image Available</Text>
              )}
            </div>
          </Col>

          {/* Product Info */}
          <Col xs={24} md={12}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Title level={2} style={{ margin: 0 }}>
                  {product.name}
                </Title>
                <Text type="secondary">{product.category || 'Uncategorized'}</Text>
              </div>

              <div>
                <Text strong style={{ fontSize: '24px', color: '#1890ff' }}>
                  ${product.price?.toFixed(2) || '0.00'}
                </Text>
                {product.originalPrice && (
                  <Text delete style={{ marginLeft: '12px' }}>
                    ${product.originalPrice?.toFixed(2)}
                  </Text>
                )}
              </div>

              {product.stock !== undefined && (
                <Text type={product.stock > 0 ? 'success' : 'danger'}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </Text>
              )}

              <Paragraph>{product.description}</Paragraph>

              <Card>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text>Quantity:</Text>
                    <InputNumber
                      min={1}
                      max={product.stock || 999}
                      value={quantity}
                      onChange={setQuantity}
                      style={{ marginLeft: '12px', width: '80px' }}
                    />
                  </div>

                  <Button
                    type="primary"
                    size="large"
                    block
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                  </Button>

                  <Button block onClick={() => window.history.back()}>
                    Back
                  </Button>
                </Space>
              </Card>
            </Space>
          </Col>
        </Row>

        {/* Tabs for Additional Info and AI Chat */}
        <div style={{ marginTop: '48px' }}>
          <Tabs
            items={[
              {
                key: 'details',
                label: 'Details',
                children: (
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <Text strong>Description:</Text>
                      <Paragraph>{product.description}</Paragraph>
                    </div>
                    {product.specs && (
                      <div>
                        <Text strong>Specifications:</Text>
                        <Paragraph>{product.specs}</Paragraph>
                      </div>
                    )}
                  </Space>
                ),
              },
              {
                key: 'ai-chat',
                label: 'Ask AI',
                children: (
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div
                      style={{
                        height: '400px',
                        overflowY: 'auto',
                        border: '1px solid #d9d9d9',
                        borderRadius: '4px',
                        padding: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      {messages.length === 0 ? (
                        <Empty description="Ask a question about this product" />
                      ) : (
                        messages.map((msg, idx) => (
                          <MessageBubble
                            key={idx}
                            message={msg.text}
                            isUser={msg.isUser}
                            timestamp={new Date().toISOString()}
                          />
                        ))
                      )}
                      {chatLoading && <Spin />}
                    </div>

                    <Space style={{ width: '100%' }}>
                      <input
                        type="text"
                        placeholder="Ask a question about this product..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        disabled={chatLoading}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          border: '1px solid #d9d9d9',
                          borderRadius: '4px',
                        }}
                      />
                      <Button
                        type="primary"
                        onClick={handleSendMessage}
                        loading={chatLoading}
                      >
                        Send
                      </Button>
                    </Space>
                  </Space>
                ),
              },
              {
                key: 'reviews',
                label: 'Reviews',
                children: (
                  <Empty description="No reviews yet" style={{ marginTop: '50px' }} />
                ),
              },
            ]}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default ProductDetails;
