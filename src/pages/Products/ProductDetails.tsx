import { Card, Col, Divider, Row, Typography } from 'antd';
import CryptoJS from 'crypto-js';
import { useNavigate, useParams } from 'react-router-dom';
import TButton from '../../components/buttons/TButton';
import dummyBG from '../../img/Bookshop-pana.png';
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
    <div className="bg-background py-8 px-4 lg:px-8  mx-auto">
      {/* Heading Section */}
      <div className="bg-gradient-to-r from-primary-dark to-primary text-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold">Product Details</h1>
        <p className="text-primary-fade">Discover more about this book and make it yours today.</p>
      </div>

      <Row gutter={[32, 32]} justify="center" align="top">
        {/* Product Image */}
        <Col xs={24} md={11} className="transition-transform transform  hover:scale-10 duration-300 ease-in-out">
          <Card
            hoverable
            cover={
              <img
                alt={product.title}
                src={product.image || dummyBG}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            }
            className="shadow-md rounded-lg"
          >

            {/* <Text className="text-center text-text-accent">{product.author || 'Unknown Author'}</Text> */}
          </Card>
        </Col>

        {/* Product Details */}
        <Col xs={24} md={11} className="bg-white  rounded-lg shadow-lg p-6">
          <Card bordered={false} className="h-full">
            <Title level={2} className="text-center text-text">{product.title}</Title>
            <Divider className="my-4" />

            {/* Price */}
            <div className="mb-4">
              <Text strong className="text-text">Price: </Text>
              <Text className="text-primary font-semibold text-lg">${product.price}</Text>
            </div>
            <Divider className="my-4" />

            {/* Category */}
            <div className="mb-4">
              <Text strong className="text-text">Category: </Text>
              <Text className="text-text-accent">{product.category || 'N/A'}</Text>
            </div>
            <Divider className="my-4" />

            {/* Description */}
            <div className="mb-4 max-h-64 overflow-y-auto">
              <Text strong className="text-text">Description: </Text>
              <Text className="text-text-accent">{product.description || 'No description available.'}</Text>
            </div>
            <Divider className="my-4" />

            {/* Author */}
            <div className="mb-4">
              <Text strong className="text-text">Author: </Text>
              <Text className="text-text-accent">{product.author || 'Unknown'}</Text>
            </div>
            <Divider className="my-4" />

            {/* Publisher */}
            <div className="mb-4">
              <Text strong className="text-text">Publisher: </Text>

              <Text className="text-text-accent">XYZ Publisher</Text>
            </div>
            <Divider className="my-4" />

            {/* Release Date */}
            <div className="mb-4">
              <Text strong className="text-text">Release Date: </Text>
              <Text className="text-text-accent">January 1, 2023</Text>
            </div>
            <Divider className="my-4" />

            {/* Availability */}
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
            <div className="mt-auto w-full max-w-[200px] mx-auto">
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
