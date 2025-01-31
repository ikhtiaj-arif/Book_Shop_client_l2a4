
import { Carousel, Typography } from 'antd';

import { useNavigate } from 'react-router-dom';
import TButton from '../components/buttons/TButton';
import banner3 from './../img/banner/6902390.jpg';
import './Banner.css';

const { Title, Paragraph } = Typography;


const Banner = () => {
    const navigate = useNavigate()
    return (
        <div className="banner-container" style={{ position: 'relative', width: '100%', padding: '20px' }}>
            <Carousel autoplay effect="fade">
                <div className='lg:p-6 bg-background rounded-lg'>
                    <div
                        className="banner-item"
                        style={{
                            backgroundImage: `url(${banner3})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundColor: '#44cad2', // Background color as fallback
                            padding: '70px',
                            height: '70vh',
                            borderRadius: '8px',

                            textAlign: 'center',
                            color: '#44cad2',
                        }}
                    >
                        <Title level={2}>Free Shipping on Orders Above $50</Title>
                        <Paragraph style={{ marginBottom: '20px' }}>
                            Get free shipping when you spend over $50 on your next order.
                        </Paragraph>
                        <div className='w-20 mx-auto'>

                            <TButton
                                text="Shop Now"
                                onClick={() => navigate('/products')}
                                className=''
                            />
                        </div>


                    </div>
                </div>
            </Carousel>
        </div>

    );
};

export default Banner;
