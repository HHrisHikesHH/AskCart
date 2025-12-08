import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Space, Input, Card, Typography, Empty } from 'antd';
import { SearchOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import productsAPI from '../api/products';
import ProductGrid from '../components/products/ProductGrid';
import Loader from '../components/common/Loader';

const { Title, Paragraph } = Typography;

const Landing = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', { limit: 8 }],
    queryFn: () => productsAPI.getAll({ limit: 8 }).then((res) => res.data),
  });

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchValue)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          padding: '80px 24px',
          textAlign: 'center',
          marginBottom: '48px',
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={1} style={{ color: '#fff', margin: 0 }}>
            🛒 Welcome to AskCart
          </Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px' }}>
            AI-powered shopping experience. Search, compare, and buy with confidence.
          </Paragraph>

          {/* Search Bar */}
          <Row justify="center" gutter={8} style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Col xs={24} sm={18}>
              <Input
                size="large"
                placeholder="Search for products or ask AI..."
                prefix={<SearchOutlined />}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleKeyPress}
                allowClear
              />
            </Col>
            <Col xs={24} sm={6}>
              <Button
                type="primary"
                size="large"
                block
                onClick={handleSearch}
                style={{ backgroundColor: '#1890ff' }}
              >
                Search
              </Button>
            </Col>
          </Row>

          <Button
            type="primary"
            size="large"
            onClick={() => navigate('/ai')}
            style={{ marginTop: '16px', backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            Ask AI Assistant →
          </Button>
        </Space>
      </div>

      {/* Featured Categories */}
      <div style={{ padding: '0 24px', marginBottom: '48px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
          Browse Categories
        </Title>

        <Row gutter={[16, 16]}>
          {['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Food', 'Toys', 'Beauty'].map((cat) => (
            <Col xs={12} sm={6} md={4} key={cat}>
              <Card
                hoverable
                style={{
                  textAlign: 'center',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/products?category=${cat}`)}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                  {cat === 'Electronics' && '📱'}
                  {cat === 'Clothing' && '👕'}
                  {cat === 'Books' && '📚'}
                  {cat === 'Home' && '🏠'}
                  {cat === 'Sports' && '⚽'}
                  {cat === 'Food' && '🍔'}
                  {cat === 'Toys' && '🎮'}
                  {cat === 'Beauty' && '💄'}
                </div>
                <Paragraph style={{ margin: 0 }}>{cat}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Popular Products */}
      <div style={{ padding: '0 24px', marginBottom: '48px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
          Popular Products
        </Title>

        {isLoading ? (
          <Loader count={4} />
        ) : products && products.length > 0 ? (
          <>
            <ProductGrid products={products} loading={false} onAddToCart={() => {}} />
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate('/products')}
                icon={<ArrowRightOutlined />}
              >
                View All Products
              </Button>
            </div>
          </>
        ) : (
          <Empty description="No products available" style={{ marginTop: '50px' }} />
        )}
      </div>

      {/* CTA Section */}
      <div
        style={{
          background: '#f5f5f5',
          padding: '48px 24px',
          textAlign: 'center',
          marginTop: '48px',
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={2} style={{ margin: 0 }}>
            Ready to Start Shopping?
          </Title>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate('/products')}
            style={{ marginTop: '16px' }}
          >
            Browse Products
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Landing;
