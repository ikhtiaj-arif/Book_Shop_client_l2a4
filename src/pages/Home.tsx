import Banner from './Banner';
import BookStoreFooter from './Footer';
import FeaturedProducts from './Products/FeaturedProducts';
import Testimonials from './Testimonials';

const Home = () => {

    return (
        <div>
            <Banner />

            <div className='w-full bg-white md:px-[50px] xl:px-[60px] 2xl:px-[156px] mx-auto flex flex-col gap-y-20 mt-20'>

                <FeaturedProducts />
                <Testimonials />
                {/* <Testimonials /> */}
                <div />

            </div>
            <BookStoreFooter />

        </div>
    );
};

export default Home;