import { Button, Card, Col, Divider, Row, Typography } from 'antd';
import CryptoJS from 'crypto-js';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../redux/features/products/products.api';

const { Title, Text } = Typography;

const ProductDetails = () => {
  const { id } = useParams(); // Extract 'id' from the route params
  const navigate = useNavigate();

  const { data: productData, isLoading, isError } = useGetProductByIdQuery(id);
  const product = productData?.data

  if (isLoading) return <p>Loading...</p>;
  if (isError || !product) return <p>Product not found.</p>;



  // // Find the product based on the product ID from the URL
  // const product = products.find((prod) => prod.id === parseInt(id));

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const handleBuyNow = () => {
  
    // Encrypt product info
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(product),
      'secret_key' // Use a secure key here
    ).toString();
  
    // Save encrypted data to localStorage
    localStorage.setItem('checkoutProduct', encryptedData);
  
    // Navigate to the checkout page
    navigate(`/checkout`);
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: 'auto' }}>
      <Row gutter={[32, 32]} justify="center" align="middle">
        {/* Product Image */}
        <Col xs={24} md={12}>
          <Card
            hoverable
            cover={
              <img
                alt={product.name}
                src={product.image || 'https://via.placeholder.com/400'}
                style={{
                  borderRadius: '8px',
                  maxHeight: '400px',
                  objectFit: 'cover',
                }}
              />
            }
            style={{
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Title level={3} style={{ textAlign: 'center' }}>
              {product.title}
            </Title>
          </Card>
        </Col>

        {/* Product Details */}
        <Col xs={24} md={12}>
          <Card
            bordered
            style={{
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              padding: '20px',
            }}
          >
            <Title level={3}>Product Details</Title>
            <Divider />
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Price: </Text>
              <Text style={{ fontSize: '18px', color: '#1890ff' }}>
                ${product.price}
              </Text>
            </div>
            <Divider />
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Category: </Text>
              <Text>{product.category}</Text>
            </div>
            <Divider />
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Description: </Text>
              <Text>{product.description}</Text>
            </div>
            <Divider />
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Availability: </Text>
              <Text
                style={{
                  color: product.inStock ? 'green' : 'red',
                  fontWeight: 'bold',
                }}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </Text>
            </div>
            <Divider />
            <Button
              type="primary"
              size="large"
              disabled={!product.inStock}
              onClick={handleBuyNow}
              style={{
                width: '100%',
                borderRadius: '8px',
                height: '48px',
                fontSize: '16px',
              }}
            >
              {product.inStock ? 'Buy Now' : 'Out of Stock'}
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
