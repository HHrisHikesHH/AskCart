import type { ReactNode } from 'react';
import { Layout, Space, Typography, Divider, Row, Col } from 'antd';

const { Footer } = Layout;
const { Text, Paragraph } = Typography;

const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Footer
      style={{
        background: '#001529',
        color: '#fff',
        padding: '48px 24px',
        marginTop: '64px',
      }}
    >
      <Row gutter={[32, 32]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} md={6}>
          <Space direction="vertical" size="middle">
            <Text strong style={{ color: '#fff', fontSize: '16px' }}>
              🛒 AskCart
            </Text>
            <Paragraph style={{ color: '#rgba(255,255,255,0.85)', margin: 0 }}>
              AI-powered e-commerce platform for seamless shopping experience.
            </Paragraph>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Space direction="vertical" size="small">
            <Text strong style={{ color: '#fff' }}>
              Quick Links
            </Text>
            <Text style={{ color: '#rgba(255,255,255,0.85)', display: 'block', cursor: 'pointer' }}>
              Home
            </Text>
            <Text style={{ color: '#rgba(255,255,255,0.85)', display: 'block', cursor: 'pointer' }}>
              Products
            </Text>
            <Text style={{ color: '#rgba(255,255,255,0.85)', display: 'block', cursor: 'pointer' }}>
              About
            </Text>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Space direction="vertical" size="small">
            <Text strong style={{ color: '#fff' }}>
              Support
            </Text>
            <Text style={{ color: '#rgba(255,255,255,0.85)', display: 'block', cursor: 'pointer' }}>
              Help Center
            </Text>
            <Text style={{ color: '#rgba(255,255,255,0.85)', display: 'block', cursor: 'pointer' }}>
              Contact Us
            </Text>
            <Text style={{ color: '#rgba(255,255,255,0.85)', display: 'block', cursor: 'pointer' }}>
              FAQs
            </Text>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Space direction="vertical" size="small">
            <Text strong style={{ color: '#fff' }}>
              Legal
            </Text>
            <Text style={{ color: '#rgba(255,255,255,0.85)', display: 'block', cursor: 'pointer' }}>
              Privacy Policy
            </Text>
            <Text style={{ color: '#rgba(255,255,255,0.85)', display: 'block', cursor: 'pointer' }}>
              Terms & Conditions
            </Text>
            <Text style={{ color: '#rgba(255,255,255,0.85)', display: 'block', cursor: 'pointer' }}>
              Cookie Policy
            </Text>
          </Space>
        </Col>
      </Row>

      <Divider style={{ borderColor: 'rgba(255,255,255,0.2)' }} />

      <Row justify="center">
        <Text style={{ color: '#rgba(255,255,255,0.65)' }}>
          © {currentYear} AskCart. All rights reserved.
        </Text>
      </Row>
    </Footer>
  );
};

export default AppFooter;
