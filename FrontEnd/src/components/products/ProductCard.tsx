import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Space, Image } from 'antd';
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      cover={
        <div
          style={{
            width: '100%',
            height: '200px',
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
          onClick={() => navigate(`/products/${product.id}`)}
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              preview={false}
            />
          ) : (
            <Text type="secondary">No Image</Text>
          )}
        </div>
      }
      bodyStyle={{ display: 'flex', flexDirection: 'column', flex: 1 }}
    >
      <Space direction="vertical" style={{ width: '100%', flex: 1 }}>
        <Title
          level={5}
          style={{ margin: 0, cursor: 'pointer' }}
          onClick={() => navigate(`/products/${product.id}`)}
          ellipsis={{ rows: 2 }}
        >
          {product.name}
        </Title>

        <Paragraph
          ellipsis={{ rows: 2 }}
          style={{
            margin: 0,
            fontSize: '12px',
            color: '#999',
            flex: 1,
          }}
        >
          {product.description}
        </Paragraph>

        <div style={{ marginTop: 'auto' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text strong style={{ fontSize: '18px', color: '#1890ff' }}>
              ${product.price?.toFixed(2) || '0.00'}
            </Text>

            {product.stock !== undefined && (
              <Text type={product.stock > 0 ? 'success' : 'danger'}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </Text>
            )}

            <Space style={{ width: '100%' }}>
              <Button
                type="primary"
                block
                icon={<ShoppingCartOutlined />}
                onClick={() => onAddToCart && onAddToCart(product.id)}
                disabled={product.stock === 0}
              >
                Add to Cart
              </Button>
              <Button
                icon={<EyeOutlined />}
                onClick={() => navigate(`/products/${product.id}`)}
              />
            </Space>
          </Space>
        </div>
      </Space>
    </Card>
  );
};

export default ProductCard;
