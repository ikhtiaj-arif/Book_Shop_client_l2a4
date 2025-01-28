import { Button, Card, Divider } from 'antd';
import CryptoJS from 'crypto-js';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { currentUser } from '../../redux/features/auth/authSlice';
import { useCreateOrderMutation } from '../../redux/features/orders/order.api';
import { useAppSelector } from '../../redux/hooks';
import TButton from '../../components/buttons/TButton';


const CheckoutPage = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [placeOrder] = useCreateOrderMutation();
  const user = useAppSelector(currentUser);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Get encrypted data from localStorage
    const encryptedData = localStorage.getItem('checkoutProduct');

    if (encryptedData) {
      try {
        // Decrypt the product info
        const decryptedData = CryptoJS.AES.decrypt(
          encryptedData,
          'secret_key' // Use the same key as in encryption
        ).toString(CryptoJS.enc.Utf8);

        // Parse the decrypted JSON string
        setProduct(JSON.parse(decryptedData));
      } catch (error) {
        console.error('Failed to decrypt product info:', error);
      }
    }
  }, []);

  const orderedQuantity = 2;

  const handlePlaceOrder = async () => {
    const totalPrice = orderedQuantity * product.price;

    const data = {
      email: user?.email,
      product: product?._id,
      quantity: orderedQuantity,
      totalPrice,
    };

    try {
      const res = await placeOrder(data);
      console.log(res);
      navigate('/');
      localStorage.removeItem('checkoutProduct');
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="bg-background py-12 px-6 max-w-7xl mx-auto">
      <Card className="border-none shadow-lg rounded-lg p-8 bg-white">
        <h1 className="text-3xl font-semibold text-text mb-6">Checkout</h1>
        <Divider className="border-text-accent" />

        {/* Product Details */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-text">Product Details</h3>
          <div className="flex gap-8 mt-4">
            <div className="w-1/3">
              <img
                src={product.image || 'https://via.placeholder.com/400'}
                alt={product.title}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="w-2/3">
              <p className="text-text font-medium">Product Name: {product.title}</p>
              <p className="text-text-accent font-medium">Price: ${product.price}</p>
              <p className="text-text-accent mt-2">{product.description}</p>
            </div>
          </div>
        </section>

        <Divider className="border-text-accent" />

        {/* Billing Details Form */}
        <section>
          <h3 className="text-2xl font-semibold text-text mb-4">Billing Details</h3>
          <form
            onSubmit={handleSubmit(handlePlaceOrder)}
            className="space-y-6 mt-4"
          >
            <div>
              <label htmlFor="fullName" className="block text-text font-medium">
                Full Name
              </label>
              <input
                id="fullName"
                {...register('fullName', { required: 'Full Name is required' })}
                placeholder="Enter your full name"
                className="w-full p-4 rounded-lg border border-text-accent focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName.message}</p>
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
                className="w-full p-4 rounded-lg border border-text-accent focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
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
                className="w-full p-4 rounded-lg border border-text-accent focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
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
                className="w-full p-4 rounded-lg border border-text-accent focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>

            {/* Submit Button */}
            {/* <TButton
              text="Place Order"
              type="submit"
              primaryColor="primary"
              accentColor="accent"
              className="w-full py-4 mt-6"
              disabled={Object.keys(errors).length > 0} // Disable button if there are errors
            /> */}
          </form>
        </section>
      </Card>
    </div>
  );
};

export default CheckoutPage;
