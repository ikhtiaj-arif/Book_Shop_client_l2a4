import { Card, Col, Divider, Row, Typography } from 'antd';
import CryptoJS from 'crypto-js';
import { useNavigate, useParams } from 'react-router-dom';
import TButton from '../../components/buttons/TButton';
import { useGetProductByIdQuery } from '../../redux/features/products/products.api';

const { Title, Text } = Typography;

const ProductDetails = () => {
  const { id } = useParams(); // Extract 'id' from the route params
  const navigate = useNavigate();

  const { data: productData, isLoading, isError } = useGetProductByIdQuery(id);
  const product = productData?.data;

  if (isLoading) return <p>Loading...</p>;
  if (isError || !product) return <p>Product not found.</p>;

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
    <div className="bg-background py-12 px-6 max-w-7xl mx-auto">
      <Row gutter={[32, 32]} justify="center" align="middle">
        {/* Product Image */}
        <Col xs={24} md={12} className="transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <Card
            hoverable
            cover={
              <img
                alt={product.name}
                src={product.image || 'https://via.placeholder.com/400'}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            }
            className="shadow-md rounded-lg"
          >
            <Title level={3} className="text-center text-text">{product.title}</Title>
          </Card>
        </Col>

        {/* Product Details */}
        <Col xs={24} md={12} className="bg-white rounded-lg shadow-lg p-6">
          <Card bordered={false} className="h-full">
            <Title level={3} className="text-text">Product Details</Title>
            <Divider className="my-4" />

            <div className="mb-4">
              <Text strong className="text-text">Price: </Text>
              <Text className="text-primary font-semibold text-lg">${product.price}</Text>
            </div>
            <Divider className="my-4" />

            <div className="mb-4">
              <Text strong className="text-text">Category: </Text>
              <Text className="text-text-accent">{product.category}</Text>
            </div>
            <Divider className="my-4" />

            <div className="mb-4">
              <Text strong className="text-text">Description: </Text>
              <Text className="text-text-accent">{product.description}</Text>
            </div>
            <Divider className="my-4" />

            <div className="mb-4">
              <Text strong className="text-text">Availability: </Text>
              <Text
                className={`font-semibold ${product.inStock ? 'text-green-500' : 'text-red-500'}`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </Text>
            </div>
            <Divider className="my-4" />

            {/* Buy Now Button */}
            <div className="mt-auto">
              <TButton
                text={product.inStock ? 'Buy Now' : 'Out of Stock'}
                onClick={handleBuyNow}
                primaryColor="primary"
                accentColor="accent"
                disabled={!product.inStock}

                className="w-full py-3 text-white rounded-lg shadow-md"
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
