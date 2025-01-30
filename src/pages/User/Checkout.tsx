import { Card, Checkbox, Divider, Form, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomButton from "../../components/buttons/CustomButton";
import CustomButtonS from "../../components/buttons/CustomButtonS";
import CartItem from "../../components/cart/Cart";
import BSInput from "../../components/form/BSInput";
import { currentUser, TUser } from "../../redux/features/auth/authSlice";
import { removeFromCart, updateQuantity, useCurrentCartProduct } from "../../redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "../../redux/features/orders/order.api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { processCart } from "../../utils/CartGenerator";


const { Title, Text } = Typography;

const CheckoutPage: React.FC = () => {
  const cart = useAppSelector(useCurrentCartProduct);
  const user = useAppSelector(currentUser) as TUser;
  const [form] = Form.useForm();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [createOrder, { isLoading, isSuccess, data, isError, error }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
};

const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
};

  const handleConfirmOrder = async (values: any) => {
    if (!agreeToTerms) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    const processedCart = await processCart(cart, user?.email);
    const res = await createOrder({ products: processedCart, billingAddress: values });
    console.log(res);
  };

  const toastId = 'checkout';
  React.useEffect(() => {
    if (isLoading) toast.loading("Processing your order...", { id: toastId });
    if (isSuccess) {
      toast.success("Order placed successfully!", { id: toastId });
      if (data?.data) {
        setTimeout(() => {
          window.location.href = data.data;
        }, 1000);
      }
    }
    if (isError) toast.error(JSON.stringify(error), { id: toastId });
  }, [data, error, isError, isLoading, isSuccess]);

  const subtotal = cart.reduce((total, item) => total + item.price * item.orderQuantity, 0);

  return (
    <div className="bg-background rounded-lg p-2 md:p-4 min-h-screen ">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-dark to-primary text-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-white">Discover and filter the books you love.</p>


      </div>

      <Divider />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-6xl mx-auto">
        <Card title="Billing Address" className="shadow-sm">
          <Form form={form} layout="vertical" onFinish={handleConfirmOrder}>
            <BSInput type="text" name="address" label="Address" placeholder="123 Main St" />
            <BSInput type="text" name="city" label="City" placeholder="New York" />
            <BSInput type="text" name="state" label="State" placeholder="NY" />
            <BSInput type="text" name="zipCode" label="Zip Code" placeholder="10001" />
            <BSInput type="text" name="country" label="Country" placeholder="USA" />
            <Form.Item>
              <Checkbox checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)}>
                I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">terms and conditions</a>.
              </Checkbox>
            </Form.Item>
          </Form>
        </Card>
        <Card title="Order Summary" className="shadow-sm mx-10">
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem
                key={item._id}
              
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem} />
            ))}
          </div>
          <Divider />
          <div className="flex justify-between items-center text-lg font-semibold mb-4">
            <Text>Subtotal</Text>
            <Text>${subtotal.toFixed(2)}</Text>
          </div>
          <div className="flex flex-col gap-4">

            <CustomButton text="Confirm Order" onClick={() => form.submit()} loading={isLoading} disabled={cart.length === 0 || !agreeToTerms} />
            <CustomButtonS text="Continue Shopping" onClick={() => navigate("/products")} type="default" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
