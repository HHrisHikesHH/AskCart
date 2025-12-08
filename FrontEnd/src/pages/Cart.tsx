import React, { useEffect } from 'react';
import { Layout, Row, Col, Empty, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../contexts/CartContext';
import { useUI } from '../contexts/UIContext';
import Loader from '../components/common/Loader';

const { Content } = Layout;

const Cart = () => {
  const navigate = useNavigate();
  const { items, total, loading, fetchCart, updateItem, removeItem } = useCart();
  const { showSuccess, showError } = useUI();

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      await updateItem(itemId, quantity);
      showSuccess('Cart updated!');
    } catch (err) {
      showError('Failed to update cart');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeItem(itemId);
      showSuccess('Item removed from cart!');
    } catch (err) {
      showError('Failed to remove item');
    }
  };

  if (loading && items.length === 0) {
    return (
      <Layout>
        <Content style={{ padding: '24px' }}>
          <Loader />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <h1>Shopping Cart</h1>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '50px', paddingBottom: '50px' }}>
            <Empty description="Your cart is empty" />
            <Button type="primary" onClick={() => navigate('/products')} style={{ marginTop: '16px' }}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <Space direction="vertical" style={{ width: '100%' }}>
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </Space>
            </Col>

            <Col xs={24} lg={8}>
              <CartSummary
                items={items}
                total={total}
                loading={loading}
              />
            </Col>
          </Row>
        )}
      </Content>
    </Layout>
  );
};

export default Cart;
