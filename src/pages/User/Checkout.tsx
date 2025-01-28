import { Card, Divider } from 'antd';
import CryptoJS from 'crypto-js';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import TButton from '../../components/buttons/TButton';
import dummyBG from '../../img/Bookshop-pana.png';
import { currentUser } from '../../redux/features/auth/authSlice';
import { useCreateOrderMutation } from '../../redux/features/orders/order.api';
import { useAppSelector } from '../../redux/hooks';
import { IProduct } from '../../types/types';

const CheckoutPage: React.FC = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();
  const [placeOrder] = useCreateOrderMutation();
  const user = useAppSelector(currentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const encryptedData = localStorage.getItem('checkoutProduct');

    if (encryptedData) {
      try {
        const decryptedData = CryptoJS.AES.decrypt(
          encryptedData,
          'secret_key'
        ).toString(CryptoJS.enc.Utf8);
        setProduct(JSON.parse(decryptedData) as IProduct);
      } catch (error) {
        console.error('Failed to decrypt product info:', error);
      }
    }
  }, []);

  const handlePlaceOrder = async () => {
    if (!product) return;

    const totalPrice = quantity * product.price;

    const data = {
      email: user?.email,
      product: product._id,
      quantity,
      totalPrice,
    };

    try {
      const res = await placeOrder(data).unwrap();
      console.log(res);
      navigate('/');
      localStorage.removeItem('checkoutProduct');
    } catch (err) {
      console.error('Order placement failed:', err);
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="bg-background py-8 px-4 lg:px-8">
      {/* Page Heading */}
      <div className="bg-gradient-to-r from-primary-dark to-primary text-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-primary-fade">
          Complete your purchase and enjoy your new book!
        </p>
      </div>

      <Card className="border-none shadow-lg rounded-lg pb-8 bg-white mx-auto max-w-4xl">
        {/* Product Section */}
        <section className="flex flex-col md:flex-row gap-8 p-6">
          {/* Product Image */}
          <div className="w-full md:w-1/3">
            <img
              src={product.image || dummyBG}
              alt={product.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-semibold text-text mb-2">
              {product.title}
            </h2>
            <p className="text-text-accent font-medium mb-2">
              Price: ${product.price}
            </p>
            <div className="flex items-center gap-4 mb-4">
              <p className="text-text-accent font-medium">
                Available Stock: <span className="text-accent">{product.inStock}</span>
              </p>
              <div className="flex items-center gap-2">
                <label htmlFor="quantity" className="text-text font-medium">
                  Quantity:
                </label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max={product.inStock}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-20 p-2 rounded-lg border border-text-accent focus:outline-none focus:ring-2 focus:ring-secondary focus:border-0"
                />
              </div>
            </div>
            {quantity > product.inStock && (
              <p className="text-red-500 text-sm">
                Quantity exceeds available stock.
              </p>
            )}
            <p className="text-text-accent mt-4">{product.description}</p>
          </div>
        </section>

        <Divider className="border-text-accent" />

        {/* Billing Details Section */}
        <section className="p-6">
          <h3 className="text-2xl font-semibold text-text mb-4">Billing Details</h3>
          <form onSubmit={handleSubmit(handlePlaceOrder)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-text font-medium">
                  Full Name
                </label>
                <input
                  id="fullName"
                  {...register('fullName', { required: 'Full Name is required' })}
                  placeholder="Enter your full name"
                  className="w-full p-3 rounded-lg border border-text-accent focus:outline-none focus:ring-2 focus:ring-secondary focus:border-0"
                />
                {errors.fullName?.message && (
                  <p className="text-red-500 text-sm">
                    {typeof errors.fullName.message === 'string' ? errors.fullName.message : 'Invalid input'}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-text font-medium">
                  Email
                </label>
                <input
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Enter a valid email address',
                    },
                  })}
                  placeholder="Enter your email address"
                  className="w-full p-3 rounded-lg border border-text-accent focus:outline-none focus:ring-2 focus:ring-secondary focus:border-0"
                />
                {errors.email?.message && (
                  <p className="text-red-500 text-sm">
                    {typeof errors.email.message === 'string' ? errors.email.message : 'Invalid input'}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-text font-medium">
                  Address
                </label>
                <input
                  id="address"
                  {...register('address', { required: 'Address is required' })}
                  placeholder="Enter your shipping address"
                  className="w-full p-3 rounded-lg border border-text-accent focus:outline-none focus:ring-2 focus:ring-secondary focus:border-0"
                />
                {errors.address?.message && (
                  <p className="text-red-500 text-sm">
                    {typeof errors.address.message === 'string' ? errors.address.message : 'Invalid input'}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="city" className="block text-text font-medium">
                  City
                </label>
                <input
                  id="city"
                  {...register('city', { required: 'City is required' })}
                  placeholder="Enter your city"
                  className="w-full p-3 rounded-lg border border-text-accent focus:outline-none focus:ring-2 focus:ring-secondary focus:border-0"
                />
                {errors.city?.message && (
                  <p className="text-red-500 text-sm">
                    {typeof errors.city.message === 'string' ? errors.city.message : 'Invalid input'}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <TButton
                text="Place Order"
                type="submit"
                className="w-full md:w-1/3 py-3 mt-6 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow-md transition-all"
                disabled={
                  quantity > product.inStock || quantity < 1 || Object.keys(errors).length > 0
                }
              />
            </div>
          </form>
        </section>

      </Card>
    </div>
  );
};

export default CheckoutPage;
