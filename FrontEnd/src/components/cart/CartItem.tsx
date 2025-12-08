import type { FC } from 'react';
import { Card, Row, Col, InputNumber, Button, Space, Typography, Image } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

interface CartItemProps {
  item: any;
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  onRemove?: (itemId: string) => void;
}

const CartItem: FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <Card style={{ marginBottom: '16px', borderRadius: '8px' }}>
      <Row gutter={16} align="middle">
        {/* Product Image */}
        <Col xs={24} sm={4}>
          <div
            style={{
              width: '100%',
              height: '100px',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                preview={false}
              />
            ) : (
              <Text type="secondary">No Image</Text>
            )}
          </div>
        </Col>

        {/* Product Details */}
        <Col xs={24} sm={12}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Title level={5} style={{ margin: 0 }}>
              {item.name}
            </Title>
            <Text type="secondary">{item.description}</Text>
            <Text strong style={{ fontSize: '16px', color: '#1890ff' }}>
              ${item.price?.toFixed(2) || '0.00'} each
            </Text>
          </Space>
        </Col>

        {/* Quantity and Actions */}
        <Col xs={24} sm={8}>
          <Space direction="vertical" style={{ width: '100%' }} align="end">
            <Space>
              <Text>Qty:</Text>
              <InputNumber
                min={1}
                max={999}
                value={item.quantity}
                onChange={(value) => onUpdateQuantity?.(item.id, value)}
                style={{ width: '60px' }}
              />
            </Space>

            <Text strong style={{ fontSize: '16px' }}>
              Subtotal: ${(item.price * item.quantity).toFixed(2)}
            </Text>

            <Button
              type="primary"
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => onRemove?.(item.id)}
            >
              Remove
            </Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default CartItem;
