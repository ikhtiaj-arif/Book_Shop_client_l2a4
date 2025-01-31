import { Card, Col, Row, Skeleton, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import TButton from '../../components/buttons/TButton';
import { useGetAllProductsQuery } from '../../redux/features/products/products.api';
import { IProduct } from '../../types/types';

const { Meta } = Card;
const { Title, Text } = Typography;

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { data: allProducts, isLoading } = useGetAllProductsQuery(undefined)
  const products = allProducts?.data
  const displayProducts = products?.slice(0, 6);

  const handleViewAll = () => {
    navigate('/products');
  };

  if (isLoading) {
    return (
      <div className="featured-products bg-background py-16 rounded-lg px-4 mb-5">
        <Title level={2} style={{ textAlign: "center", color: "#333", marginBottom: "30px" }}>
          Featured Products
        </Title>
        <Row gutter={[24, 24]} justify="center">
          {[...Array(6)].map((_, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card
                className="custom-card"
                style={{
                  borderRadius: "8px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
                cover={<Skeleton.Image style={{ width: "100%", height: "220px" }} />}
              >
                <Skeleton active />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  return (
    <div className="featured-products bg-background py-16 rounded-lg px-4 mb-5"  >
      <Title level={2} style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
        Featured Products
      </Title>
      <Row gutter={[24, 24]} justify="center">
        {displayProducts?.map((product: IProduct) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
            <Card
            // onClick={() => navigate(`/products/${product._id}`)}
              hoverable
              className="custom-card"
              cover={
                <img
                  alt={product.title}
                  src={product.imageUrl}
                  style={{ height: '220px', objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
                />
              }
              style={{
                borderRadius: '8px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease-in-out',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Meta title={product.title} description={<Text strong>${product.price.toFixed(2)}</Text>} />
            </Card>
          </Col>
        ))}
      </Row>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <TButton onClick={handleViewAll} text="View All Products" />
      </div>
    </div>
  );
};

export default FeaturedProducts;
