import { Button, Col, Input, Layout, Row, Typography } from "antd";

const { Header, Content } = Layout;
const { Title } = Typography;

const buttonStyle = {
  marginLeft: "0.625rem",
  borderRadius: "30px",
};

export default function LandingPage() {
  return (
    <Layout>
      <Header style={{ backgroundColor: "white", padding: "0 1.25rem" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ color: "#007bff", margin: 0 }}>
              AskCart
            </Title>
          </Col>
          <Col>
            <Button type="primary" style={buttonStyle}>
              Login
            </Button>
            <Button type="default" style={buttonStyle}>
              Sign Up
            </Button>
          </Col>
        </Row>
      </Header>

      <Content
        style={{ backgroundColor: "white", padding: "3.125rem 1.25rem" }}
      >
        <Row justify="center" align="middle" style={{ minHeight: "70vh" }}>
          <Col span={12} style={{ textAlign: "center" }}>
            <Title level={1}>Find the Best Deals with AskCart</Title>
            <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>
              Looking for the perfect product? AskCart lets you search based on
              your exact needs! Just give us a prompt like, "Show me the best
              8GB RAM laptops with the lowest price," and we'll give you a
              detailed comparison of top products, helping you make the best
              choice.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>
              From electronics to home goods, AskCart uses powerful search tools
              to help you find exactly what you're looking for – fast and easy!
            </p>
            <div style={{ marginTop: "1.5rem" }}>
              <Input
                placeholder="e.g. Show me 8GB RAM laptops with lowest price"
                size="large"
                style={{ width: "80%", marginRight: "0.5remx", borderRadius: "30px" }}
              />
              <Button
                type="primary"
                size="large"
                style={{ borderRadius: "30px" }}
              >
                See Top Picks
              </Button>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
