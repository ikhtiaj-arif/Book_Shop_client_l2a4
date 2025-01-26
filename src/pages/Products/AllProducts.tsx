import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetAllProductsQuery } from '../../redux/features/products/products.api';

const AllProducts = () => {
    const { data: allProductData, isLoading } = useGetAllProductsQuery(undefined);
    const navigate = useNavigate();
    if (isLoading) {
        return <>Loading</>
    }

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '16px',
                padding: '16px',
            }}
        >
            {allProductData?.data?.map((product) => (
                <Card
                    key={product._id}
                    title={product.title}
                    bordered={true}
                    hoverable
                    style={{
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <p><strong>Author:</strong> {product.author}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <Button
                        type="primary"
                        onClick={() => navigate(`/products/${product._id}`)}
                    >
                        Details
                    </Button>
                </Card>
            ))}
        </div>
    );
};

export default AllProducts;
