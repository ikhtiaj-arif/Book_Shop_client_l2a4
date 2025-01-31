import { Card, Col, Divider, Row, Skeleton } from 'antd';

// const { Text } = Typography;

const ProductSkeleton = () => {
    return (
        <div className='max-w-6xl mx-auto bg-white rounded-lg'>
            <Row gutter={[32, 32]} justify="center" align="top">
                {/* Product Image Skeleton */}
                <Col xs={24} md={11}>
                    <Card style={{ border: 0 }}>
                        <Skeleton.Image className="w-full h-full max-w-[32rem]" active />
                    </Card>
                </Col>

                {/* Product Details Skeleton */}
                <Col xs={24} md={11} className="p-6">
                    <Card bordered={false} style={{ border: 0, boxShadow: 'none' }} className="h-full">
                        <Skeleton active title={false} paragraph={{ rows: 1, width: "80%" }} />
                        <Skeleton active title={false} paragraph={{ rows: 1, width: "50%" }} />
                        <Skeleton.Button active shape="round" size="large" />
                        <Divider />
                        <Skeleton.Button active shape="round" size="large" />
                        <div className="mb-4">
                            <Skeleton active paragraph={{ rows: 1, width: "30%" }} />
                        </div>
                        <div className="mb-4">
                            <Skeleton.Button active shape="round" size="large" />
                            <Skeleton.Button active shape="round" size="large" style={{ marginLeft: 16 }} />
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Tabs Skeleton */}
            <div className="mt-8 max-w-6xl mx-auto h-[70vh]">
                <Skeleton.Button active shape="round" size="large" style={{ width: "150px", marginBottom: 16 }} />
                <Skeleton active paragraph={{ rows: 3 }} />
            </div>
        </div>
    );
};

export default ProductSkeleton;
