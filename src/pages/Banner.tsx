
import { Button, Carousel, Typography } from 'antd';
import './Banner.css';

const { Title, Paragraph } = Typography;

const Banner = () => {
    return (
        <div className="banner-container" style={{ position: 'relative', width: '100%' }}>
            <Carousel autoplay effect="fade">
                <div>
                    <div className="banner-item" style={{ background: '#1890ff', padding: '50px 0', textAlign: 'center' }}>
                        <Title level={2} style={{ color: '#fff' }}>Special Offer 1: 50% OFF on All Items!</Title>
                        <Paragraph style={{ color: '#fff', marginBottom: '20px' }}>
                            Don't miss out on our limited-time offer. Shop now and save big!
                        </Paragraph>
                        <Button type="primary" size="large" href="/shop" style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}>
                            Shop Now
                        </Button>
                    </div>
                </div>
                <div>
                    <div className="banner-item" style={{ background: '#52c41a', padding: '50px 0', textAlign: 'center' }}>
                        <Title level={2} style={{ color: '#fff' }}>New Arrivals: Fresh Collection Available</Title>
                        <Paragraph style={{ color: '#fff', marginBottom: '20px' }}>
                            Explore our latest arrivals and be the first to grab the newest styles!
                        </Paragraph>
                        <Button type="primary" size="large" href="/new-arrivals" style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}>
                            Explore Now
                        </Button>
                    </div>
                </div>
                <div>
                    <div className="banner-item" style={{ background: '#faad14', padding: '50px 0', textAlign: 'center' }}>
                        <Title level={2} style={{ color: '#fff' }}>Free Shipping on Orders Above $50</Title>
                        <Paragraph style={{ color: '#fff', marginBottom: '20px' }}>
                            Get free shipping when you spend over $50 on your next order.
                        </Paragraph>
                        <Button type="primary" size="large" href="/shop" style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}>
                            Shop Now
                        </Button>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
