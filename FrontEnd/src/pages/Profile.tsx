import React, { useEffect } from 'react';
import { Layout, Card, Button, Space, Typography, Row, Col, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { showSuccess } = useUI();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <Title level={2}>My Profile</Title>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card title="Account Information">
              <Space direction="vertical" style={{ width: '100%' }} size="large">
                <div>
                  <Text strong>Name:</Text>
                  <Paragraph style={{ margin: 0 }}>{user?.name}</Paragraph>
                </div>

                <div>
                  <Text strong>Email:</Text>
                  <Paragraph style={{ margin: 0 }}>{user?.email}</Paragraph>
                </div>

                <Divider />

                <Button type="primary" block onClick={() => navigate('/orders')}>
                  View My Orders
                </Button>

                <Button block>Edit Profile</Button>

                <Button block>Change Password</Button>

                <Button
                  block
                  danger
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card title="Saved Addresses">
              <Space direction="vertical" style={{ width: '100%' }} size="large">
                <Paragraph type="secondary">
                  No saved addresses yet. Add one during checkout!
                </Paragraph>

                <Button block>
                  Add New Address
                </Button>
              </Space>
            </Card>
          </Col>

          <Col xs={24}>
            <Card title="Preferences">
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Text strong>Email Notifications:</Text>
                  <Button type="link" onClick={() => showSuccess('Coming soon!')}>
                    Configure
                  </Button>
                </div>

                <div>
                  <Text strong>Privacy Settings:</Text>
                  <Button type="link" onClick={() => showSuccess('Coming soon!')}>
                    Configure
                  </Button>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Profile;
