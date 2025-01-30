import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { useVerifyOrderQuery } from "../../redux/features/orders/order.api";
import { useAppDispatch } from "../../redux/hooks";

const VerifyOrder = () => {

    const dispatch = useAppDispatch()

    const [params] = useSearchParams()

    const { data, isLoading } = useVerifyOrderQuery(params.get('order_id'))
    console.log(data?.data?.[0]);
    const order = data?.data?.[0]
    useEffect(() => {
        if (order?.bank_status === 'Success') dispatch(clearCart())
    }, [order?.bank_status, dispatch])



    if (isLoading) {
        return <>Loading</>
    }
    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Verify Your Order</h1>

            {/* Product Details */}
            <div className="mb-6">

                <strong>Price per unit:</strong> {order?.currency}{order?.amount}


            </div>


            {/* Total Price */}
            <div className="mb-6">
                <p className="text-lg font-semibold text-gray-800">
                    Total Price: <span className="text-blue-600"> {order?.currency}{order?.payable_amount}</span>
                </p>
            </div>
            <div className="mb-6">
                <p className="text-lg font-semibold text-gray-800">
                    Payment Status: <span className="text-blue-600"> {order?.bank_status}</span>
                </p>
            </div>


            {/* Submit Button */}

        </div>
    );
};
export default VerifyOrder
// Example product data

