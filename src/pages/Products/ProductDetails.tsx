import { Card, Col, Divider, Row, Typography } from 'antd';
import CryptoJS from 'crypto-js';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomButton from '../../components/buttons/CustomButton';
import QuantitySelector from '../../components/buttons/QuantitySelector';
import CustomButtonS from '../../components/buttons/SecondaryBtn';
import ServiceHeader from '../../components/ServiceHeader';
import dummyBG from '../../img/Bookshop-pana.png';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useGetProductByIdQuery } from '../../redux/features/products/products.api';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import ProductSkeleton from './ProductScelleton';
import BookStoreFooter from '../Footer';

const { Text } = Typography;

const ProductDetails = () => {
  const { id } = useParams(); // Extract 'id' from the route params
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const user = useAppSelector(currentUser)
  const cart = useAppSelector((state) => state.cart.items);

  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  // const [activeTab, setActiveTab] = useState("details");
  // const [reviews, setReviews] = useState<string[]>([]);
  // const [newReview, setNewReview] = useState("");

  const { data: productData, isLoading, isError } = useGetProductByIdQuery(id);
  const product = productData?.data;
  const currentCartItem = cart.find(item => item._id === product?._id)

  console.log(currentCartItem);

  useEffect(() => {
    if (currentCartItem) setSelectedQuantity(currentCartItem?.orderQuantity as number)
  }, [currentCartItem?.orderQuantity, currentCartItem])



  const handleBuyNow = () => {
    // Add the product to the cart with selected quantity
    dispatch(addToCart({
      product,
      quantity: selectedQuantity,
    }));

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

  const handleAddToCart = () => {
    dispatch(addToCart({
      product,
      quantity: selectedQuantity,
    }));
  };

  // const handleAddReview = () => {
  //   if (newReview.trim()) {
  //     setReviews([...reviews, newReview]);
  //     setNewReview("");
  //   }
  // };

  if (isLoading) return <ProductSkeleton />;
  if (isError || !product) return <p>Product not found.</p>;

  return (
    <div className="bg-background">
    <div className="bg-background rounded-lg p-2 md:p-4 mx-auto">
      {/* Heading Section */}
      <ServiceHeader title="Product Details" text="Discover more about this book and make it yours today." />

      <div className='max-w-6xl mx-auto bg-white rounded-lg'>
        <Row gutter={[32, 32]} justify="center" align="top">
          {/* Product Image */}
          <Col xs={24} md={11} className="">
            <Card
              style={{ border: 0 }}
              cover={
                <img
                  alt={product.title}
                  src={product.image || dummyBG}
                  className="w-full h-full max-w-[32rem] object-cover "
                />
              }
              className=""
            >
            </Card>
          </Col>

          {/* Product Details */}
          <Col xs={24} md={11} className=" p-6">
            <Card bordered={false} style={{ border: 0, boxShadow: 'none' }} className="h-full">
              <p className="text-center font-bold text-3xl text-text">{product.title}</p>
              <Text strong className="text-text">{product.author} </Text>
              <div className="mb-4">

                <Text className="text-text-accent">{product.category || ''}</Text>
              </div>
              <Divider className="my-4" />

              {/* Price */}




              {/* Availability */}
              <div className="mb-4 flex justify-between items-center">


                <Text className="text-text font-semibold text-lg">${product.price}</Text>
                <Text
                  className={`font-semibold ${product.inStock ? 'text-primary' : 'text-red-500'}`}
                >
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </Text>
              </div>
              <div className="mb-4">



                <QuantitySelector
                  className='w-24'
                  quantity={selectedQuantity}
                  maxQuantity={product.quantity}
                  onIncrease={() => setSelectedQuantity((prev) => Math.min(prev + 1, product.quantity))}
                  onDecrease={() => setSelectedQuantity((prev) => Math.max(prev - 1, 1))}
                  onChange={(value) => setSelectedQuantity(value)}
                />
              </div>

              {/* Buttons */}
              <div className="mt-auto w-full flex items-center space-x-4">

                <CustomButton
                  text={product.inStock ? 'Buy Now' : 'Out of Stock'}
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                />
                <CustomButtonS
                  text="Add to Cart"
                  onClick={handleAddToCart}
                  type="default"

                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* tabs section */}

      {/* Tabs Section */}
      <div className="mt-8 max-w-6xl mx-auto h-[70vh]">
        {/* Product Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Product Details</h2>
          <p className="text-lg text-text">
            {product.description || "No details available for this product."}
          </p>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
    
            <p className="text-lg text-text">No reviews yet. Be the first to review!</p>
        

          {/* Review Input Section */}
          {/* <div className="mt-6">
            <textarea
              rows={3}
              placeholder="Write your review..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <div className="w-[18rem] mx-auto">
              <button
                onClick={handleAddReview}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Submit Review
              </button>
            </div>
          </div> */}
        </div>
      </div>
      {/* <div className="mt-8 max-w-6xl mx-auto h-[70vh]">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}

          tabBarStyle={{ fontSize: "1.5rem", fontWeight: "bold" }} // Tailwind equivalent: text-2xl font-bold
          className="custom-tabs"
        >
          <Tabs.TabPane tab="Details" key="details">
            <p className="text-lg text-text">{product.description || "No details available for this product."}</p>
          </Tabs.TabPane>


          <Tabs.TabPane tab="Reviews" key="reviews">
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                    <p className="text-text">{review}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-2xl text-text">No reviews yet. Be the first to review!</p>
            )}

            <div className="mt-6">
              <Input.TextArea
                rows={3}
                placeholder="Write your review..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="mb-4"
              />
              <div className='w-[18rem] mx-auto'>
                <CustomButton onClick={handleAddReview} text="Submit Review" />
              </div>
            </div>
          </Tabs.TabPane>
          
        </Tabs>

      </div> */}
    </div>
    <BookStoreFooter />
    </div>


  );
};

export default ProductDetails;
