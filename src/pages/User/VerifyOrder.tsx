import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useVerifyOrderQuery } from "../../redux/features/orders/order.api";

const VerifyOrder = () => {
    const product = {
        _id: "6741b89dfdb01ba4d90cfe07",
        title: "1984",
        author: "George Orwell",
        category: "Science",
        description: "A chilling dystopian novel about surveillance and control.",
        price: 15,
        quantity: 57,
    };


    const [params] = useSearchParams()

    const { data, isLoading } = useVerifyOrderQuery(params.get('order_id'))
    console.log(data?.data?.[0]);

    const [quantity, setQuantity] = useState(1);
    const [orderVerified, setOrderVerified] = useState(false);

    // Handle quantity change
    const handleQuantityChange = (e) => {
        const value = Math.min(Math.max(1, e.target.value), product.quantity); // Ensure quantity is within bounds
        setQuantity(value);
    };

    // Handle order submission
    const handleSubmit = () => {
        const totalPrice = (product.price * quantity).toFixed(2);
        const orderData = {
            productId: product._id,
            title: product.title,
            author: product.author,
            category: product.category,
            quantity: quantity,
            totalPrice: totalPrice,
        };
        console.log("Order Submitted:", orderData);
        setOrderVerified(true);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Verify Your Order</h1>

            {/* Product Details */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700">{product.title}</h2>
                <p className="text-gray-600">
                    <strong>Author:</strong> {product.author}
                </p>
                <p className="text-gray-600">
                    <strong>Category:</strong> {product.category}
                </p>
                <p className="text-gray-600">
                    <strong>Price per unit:</strong> ${product.price}
                </p>
                <p className="text-gray-600">
                    <strong>Available Quantity:</strong> {product.quantity}
                </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
                <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
                    Select Quantity:
                </label>
                <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={product.quantity}
                    className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Total Price */}
            <div className="mb-6">
                <p className="text-lg font-semibold text-gray-800">
                    Total Price: <span className="text-blue-600">${(product.price * quantity).toFixed(2)}</span>
                </p>
            </div>

            {/* Verification Message */}
            {orderVerified && (
                <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
                    <p>Your order has been verified and submitted successfully!</p>
                </div>
            )}

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                disabled={orderVerified}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {orderVerified ? "Order Submitted" : "Verify and Submit Order"}
            </button>
        </div>
    );
};
export default VerifyOrder
// Example product data

