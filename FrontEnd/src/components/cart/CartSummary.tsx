import type { FC } from 'react';
import { Card, Row, Col, Button, Space, Divider, Typography, Statistic } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;

interface CartSummaryProps {
  items: any[];
  total: number;
  loading: boolean;
  onCheckout?: () => void;
}

const CartSummary: FC<CartSummaryProps> = ({ items, total, loading, onCheckout }) => {
  const navigate = useNavigate();

  const itemCount = items?.length || 0;
  const subtotal = total || 0;
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
  const finalTotal = subtotal + tax + shipping;

  return (
    <Card
      style={{
        borderRadius: '8px',
        position: 'sticky',
        top: '100px',
      }}
      title="Order Summary"
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Row justify="space-between">
          <Text>{itemCount} item(s) in cart</Text>
          <Text>${subtotal.toFixed(2)}</Text>
        </Row>

        <Divider style={{ margin: '8px 0' }} />

        <Row justify="space-between">
          <Text>Tax (10%)</Text>
          <Text>${tax.toFixed(2)}</Text>
        </Row>

        <Row justify="space-between">
          <Text>
            Shipping
            {shipping === 0 && <Text type="success"> (FREE)</Text>}
          </Text>
          <Text>${shipping.toFixed(2)}</Text>
        </Row>

        <Divider style={{ margin: '8px 0' }} />

        <Row justify="space-between" style={{ marginBottom: '16px' }}>
          <Title level={5} style={{ margin: 0 }}>
            Total
          </Title>
          <Title level={5} style={{ margin: 0, color: '#1890ff' }}>
            ${finalTotal.toFixed(2)}
          </Title>
        </Row>

        <Button
          type="primary"
          block
          size="large"
          loading={loading}
          onClick={() => {
            onCheckout?.();
            navigate('/checkout');
          }}
          disabled={itemCount === 0}
        >
          Proceed to Checkout
        </Button>

        <Button
          block
          onClick={() => navigate('/products')}
        >
          Continue Shopping
        </Button>
      </Space>
    </Card>
  );
};

export default CartSummary;
