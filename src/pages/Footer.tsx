// src/components/Footer.js
import React from 'react';
import { Layout, Row, Col, Space, Typography, Button } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer style={{ backgroundColor: '#001529', padding: '40px 50px' }}>
      <Row gutter={[16, 16]} justify="space-between">
        {/* Contact Information */}
        <Col xs={24} sm={12} md={6}>
          <div style={{ color: 'white' }}>
            <h3>Contact Us</h3>
            <Text style={{ display: 'block' }}>Email: support@example.com</Text>
            <Text style={{ display: 'block' }}>Phone: +123 456 7890</Text>
          </div>
        </Col>

        {/* Quick Links */}
        <Col xs={24} sm={12} md={6}>
          <div style={{ color: 'white' }}>
            <h3>Quick Links</h3>
            <Space direction="vertical">
              <Button type="link" style={{ color: 'white' }} href="/">Home</Button>
              <Button type="link" style={{ color: 'white' }} href="/products">Products</Button>
              <Button type="link" style={{ color: 'white' }} href="/about">About Us</Button>
              <Button type="link" style={{ color: 'white' }} href="/contact">Contact</Button>
            </Space>
          </div>
        </Col>

        {/* Social Media */}
        <Col xs={24} sm={12} md={6}>
          <div style={{ color: 'white' }}>
            <h3>Follow Us</h3>
            <Space size="large">
              <Button
                icon={<FacebookOutlined />}
                type="link"
                href="https://facebook.com"
                target="_blank"
                style={{ color: 'white' }}
              />
              <Button
                icon={<TwitterOutlined />}
                type="link"
                href="https://twitter.com"
                target="_blank"
                style={{ color: 'white' }}
              />
              <Button
                icon={<InstagramOutlined />}
                type="link"
                href="https://instagram.com"
                target="_blank"
                style={{ color: 'white' }}
              />
              <Button
                icon={<LinkedinOutlined />}
                type="link"
                href="https://linkedin.com"
                target="_blank"
                style={{ color: 'white' }}
              />
            </Space>
          </div>
        </Col>

        {/* Copyright */}
        <Col xs={24} sm={12} md={6} style={{ textAlign: 'center', color: 'white' }}>
          <Text>
            &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
          </Text>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;
