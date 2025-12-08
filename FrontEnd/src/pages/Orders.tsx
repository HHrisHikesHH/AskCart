import React, { useEffect, useState } from 'react';
import { Layout, Table, Empty, Result, Button, Card, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ordersAPI from '../api/orders';
import Loader from '../components/common/Loader';

const { Content } = Layout;
const { Text } = Typography;

const Orders = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: () => ordersAPI.getByUser().then((res) => res.data),
  });

  // Check if backend is not implemented (common API error patterns)
  const isNotImplemented =
    (error as any)?.response?.status === 404 ||
    (error as any)?.response?.status === 501 ||
    error?.message === 'Not Found';

  if (isLoading) {
    return (
      <Layout>
        <Content style={{ padding: '24px' }}>
          <Loader />
        </Content>
      </Layout>
    );
  }

  if (isNotImplemented) {
    return (
      <Layout>
        <Content style={{ padding: '24px' }}>
          <Result
            status="info"
            title="Coming Soon"
            subTitle="Order history feature is coming soon. Check back later!"
            extra={
              <Button type="primary" onClick={() => navigate('/products')}>
                Continue Shopping
              </Button>
            }
          />
        </Content>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Content style={{ padding: '24px' }}>
          <Result
            status="error"
            title="Error"
            subTitle={error.message}
            extra={
              <Button type="primary" onClick={() => navigate('/')}>
                Back to Home
              </Button>
            }
          />
        </Content>
      </Layout>
    );
  }

  const orders = data?.orders || [];

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          pending: '#faad14',
          processing: '#1890ff',
          shipped: '#13c2c2',
          delivered: '#52c41a',
          cancelled: '#f5222d',
        };
        return (
          <span style={{ color: colors[status] || '#000' }}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total) => `$${total.toFixed(2)}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => navigate(`/order-confirmation/${record.id}`)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <h1>My Orders</h1>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '50px', paddingBottom: '50px' }}>
            <Empty description="No orders yet" />
            <Button type="primary" onClick={() => navigate('/products')} style={{ marginTop: '16px' }}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <Card>
            <Table
              columns={columns}
              dataSource={orders.map((order) => ({
                ...order,
                key: order.id,
              }))}
              pagination={{
                pageSize: 10,
                showSizeChanger: false,
              }}
            />
          </Card>
        )}
      </Content>
    </Layout>
  );
};

export default Orders;
