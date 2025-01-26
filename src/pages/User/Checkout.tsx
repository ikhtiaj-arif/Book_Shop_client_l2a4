import { Button, Card, Divider } from 'antd';
import CryptoJS from 'crypto-js';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { currentUser } from '../../redux/features/auth/authSlice';
import { useCreateOrderMutation } from '../../redux/features/orders/order.api';
import { useAppSelector } from '../../redux/hooks';

const CheckoutPage = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [placeOrder] = useCreateOrderMutation()

  // console.log('Ordered Product:', product);
  const user = useAppSelector(currentUser)

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
  const orderedQuantity = 2

  const handlePlaceOrder = async () => {
    const totalPrice = orderedQuantity * product.price

    const data = {
      email: user?.email,
      product: product?._id,
      quantity: orderedQuantity,
      totalPrice
    }
    console.log("Order", data);
    try {
      const res = await placeOrder(data)
      console.log(res);
      navigate('/')
      localStorage.removeItem('checkoutProduct');

    } catch (err) {
      console.log(err);
    }

  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <Card style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h1>Checkout</h1>
        <Divider />

        {/* Product Details */}
        <h3>Product Details</h3>
        <p>
          <strong>Product Name:</strong> {product.title}
        </p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        <Divider />

        {/* Billing Details Form */}
        <h3>Billing Details</h3>
        <form onSubmit={handleSubmit(handlePlaceOrder)} style={{ marginTop: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              {...register('fullName', { required: 'Full Name is required' })}
              placeholder="Enter your full name"
              style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
            />
            {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName.message}</p>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email">Email</label>
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
              style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
            />
            {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="address">Address</label>
            <input
              id="address"
              {...register('address', { required: 'Address is required' })}
              placeholder="Enter your shipping address"
              style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
            />
            {errors.address && <p style={{ color: 'red' }}>{errors.address.message}</p>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="city">City</label>
            <input
              id="city"
              {...register('city', { required: 'City is required' })}
              placeholder="Enter your city"
              style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
            />
            {errors.city && <p style={{ color: 'red' }}>{errors.city.message}</p>}
          </div>

          <Button type="primary" htmlType="submit" size="large" style={{ marginTop: '20px' }}>
            Place Order
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CheckoutPage;
