// src/pages/ProductDetails.js
import React from 'react';
import { Button, Row, Col, Card, Typography, Divider } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const { Title, Text } = Typography;

const ProductDetails = ({ products }) => {
  const { id } = useParams();  // Getting the product ID from the URL parameter
  const navigate = useNavigate();

  // Find the product based on the product ID from the URL
  const product = products.find((prod) => prod.id === parseInt(id));

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const handleBuyNow = () => {
    navigate(`/checkout/${product.id}`); // Redirect to the checkout page for this product
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <Row gutter={[32, 32]}>
        {/* Product Image */}
        <Col span={12}>
          <Card
            hoverable
            cover={<img alt={product.name} src={product.image} />}
            style={{ borderRadius: '8px' }}
          >
            <Title level={3}>{product.name}</Title>
            <Text>{product.description}</Text>
          </Card>
        </Col>

        {/* Product Details */}
        <Col span={12}>
          <Card
            bordered
            style={{
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Title level={3}>Product Details</Title>
            <Divider />
            <Text strong>Price: </Text>
            <Text>${product.price}</Text>
            <Divider />
            <Text strong>Category: </Text>
            <Text>{product.category}</Text>
            <Divider />
            <Text strong>Availability: </Text>
            <Text>{product.inStock ? 'In Stock' : 'Out of Stock'}</Text>
            <Divider />
            <Button type="primary" size="large" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
