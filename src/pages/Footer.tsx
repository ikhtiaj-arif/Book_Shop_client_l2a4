import { FacebookFilled, InstagramOutlined, LinkedinFilled, TwitterOutlined } from "@ant-design/icons";
import { Col, Layout, Row, Space, Typography } from "antd";
import logo from '../img/logo.png'

const { Footer } = Layout;
const { Title, Text } = Typography;

const BookStoreFooter = () => {
  return (
    <Footer className="bg-gradient-to-r from-primary-dark to-primary text-white rounded-lg shadow-md p-10" style={{}}>
      <div className="container mx-auto px-6">
        <Row gutter={[32, 32]} justify="center">

          {/* Company Info */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Title level={4} style={{ color: "#fff" }}>
              <img className="w-6 object-cover" src={logo} alt="" />
               Book Haven</Title>
            <Text style={{ color: "#fafafa" }}>
              Your one-stop online bookstore. Discover new worlds, one page at a time.
            </Text>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} md={6} lg={4}>
            <Title level={5} style={{ color: "#fff" }}>Quick Links</Title>
            <Space direction="vertical">
              <a href="#" style={{ color: "#fafafa" }}>Home</a>
              <a href="#" style={{ color: "#fafafa" }}>Shop</a>
              <a href="#" style={{ color: "#fafafa" }}>About Us</a>
              <a href="#" style={{ color: "#fafafa" }}>Contact</a>
            </Space>
          </Col>

          {/* Categories */}
          <Col xs={24} sm={12} md={6} lg={4}>
            <Title level={5} style={{ color: "#fff" }}>Categories</Title>
            <Space direction="vertical">
              <a href="#" style={{ color: "#fafafa" }}>Fiction</a>
              <a href="#" style={{ color: "#fafafa" }}>Science</a>
              <a href="#" style={{ color: "#fafafa" }}>Self-Development</a>
              <a href="#" style={{ color: "#fafafa" }}>Poetry</a>
              <a href="#" style={{ color: "#fafafa" }}>Religious</a>
            </Space>
          </Col>

          {/* Newsletter Subscription */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Title level={5} style={{ color: "#fff" }}>Stay Updated</Title>
            <Text style={{ color: "#fafafa" }}>Subscribe for book deals & latest arrivals.</Text>
            {/* <div style={{ marginTop: "10px", display: "flex" }}>
              <Input placeholder="Enter your email" style={{ borderRadius: "5px 0 0 5px" }} />
              <Button type="primary" style={{ borderRadius: "0 5px 5px 0" }}>Subscribe</Button>
            </div> */}
          </Col>
        </Row>

        {/* Social Media Links */}
        <Row justify="center" style={{ marginTop: "30px" }}>
          <Space size="large">
            <a href="#" style={{ fontSize: "18px", color: "#fafafa" }}><FacebookFilled /></a>
            <a href="#" style={{ fontSize: "18px", color: "#fafafa" }}><TwitterOutlined /></a>
            <a href="#" style={{ fontSize: "18px", color: "#fafafa" }}><InstagramOutlined /></a>
            <a href="#" style={{ fontSize: "18px", color: "#fafafa" }}><LinkedinFilled /></a>
          </Space>
        </Row>

        {/* Copyright */}
        <Text style={{ display: "block", textAlign: "center", marginTop: "20px", color: "#aaa" }}>
          &copy; {new Date().getFullYear()} Book Haven. All rights reserved.
        </Text>
      </div>
    </Footer>
  );
};

export default BookStoreFooter;
