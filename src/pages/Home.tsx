import { Footer } from 'antd/es/layout/layout';
import FeaturedProducts from './Products/FeaturedProducts';
import Testimonials from './Testimonials';

const Home = () => {
    const products = [
        { id: 1, name: 'Product 1', price: 29.99, image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Product 2', price: 39.99, image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Product 3', price: 49.99, image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Product 4', price: 59.99, image: 'https://via.placeholder.com/150' },
        { id: 5, name: 'Product 5', price: 69.99, image: 'https://via.placeholder.com/150' },
        { id: 6, name: 'Product 6', price: 79.99, image: 'https://via.placeholder.com/150' },
        { id: 7, name: 'Product 7', price: 89.99, image: 'https://via.placeholder.com/150' },
    ];
    return (
        <div>
            {/* <Banner /> */}
            {/* <FeaturedProducts products={products} />
            <Testimonials />
            <Footer /> */}
        </div>
    );
};

export default Home;