import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { useVerifyOrderQuery } from "../../redux/features/orders/order.api";
import { useAppDispatch } from "../../redux/hooks";

const VerifyOrder = () => {
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();
  const { data, isLoading } = useVerifyOrderQuery(params.get("order_id"));
  const order = data?.data?.[0];

  useEffect(() => {
    if (order?.bank_status === "Success") dispatch(clearCart());
  }, [order?.bank_status, dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="text-2xl font-bold text-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-10">
      {/* Page Heading */}
      
      <h1 className="text-3xl font-bold text-text mb-6 text-center">
        Verify Your Order
      </h1>

      {/* Order Details Card */}
      <div className="bg-primary-fade p-6 rounded-lg shadow-sm">
        {/* Product Details */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text mb-4">
            Product Details
          </h2>
          <div className="space-y-2">
            <p className="text-text-accent">
              <strong>Price per unit:</strong> {order?.currency}
              {order?.amount}
            </p>
          </div>
        </div>

        {/* Total Price */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text mb-4">
            Payment Summary
          </h2>
          <div className="space-y-2">
            <p className="text-text-accent">
              <strong>Total Price:</strong>{" "}
              <span className="text-primary-dark font-semibold">
                {order?.currency}
                {order?.payable_amount}
              </span>
            </p>
          </div>
        </div>

        {/* Payment Status */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text mb-4">
            Payment Status
          </h2>
          <div className="space-y-2">
            <p className="text-text-accent">
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  order?.bank_status === "Success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {order?.bank_status}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-8 text-center">
        <p className="text-text-accent mb-4">
          Thank you for your purchase! Your order has been successfully verified.
        </p>
        <button
          onClick={() => window.location.reload()} // Example action
          className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary-dark transition duration-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default VerifyOrder;