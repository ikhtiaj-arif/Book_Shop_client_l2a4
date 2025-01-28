// src/components/FeaturedProducts.js
import { Button, Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const FeaturedProducts = ({ products }) => {
  const navigate = useNavigate();

  // Display up to 6 products
  const displayProducts = products.slice(0, 6);

  const handleViewAll = () => {
    navigate('/products'); // Redirect to All Products Page
  };

  return (
    <div className="featured-products" style={{ padding: '20px 0' }}>
      <h2>Featured Products</h2>
      <Row gutter={[16, 16]} justify="start">
        {displayProducts.map((product) => (
          <Col span={8} key={product.id}>
            <Card
              className='bg-background'
              hoverable
              cover={<img alt={product.name} src={product.image} />}
              style={{ borderRadius: '8px' }}
            >
              <Meta title={product.name} description={`$${product.price}`} />
            </Card>
          </Col>
        ))}
      </Row>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button type="primary" onClick={handleViewAll}>
          View All
        </Button>
      </div>
    </div>
  );
};

export default FeaturedProducts;
