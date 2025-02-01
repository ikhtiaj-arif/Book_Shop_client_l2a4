import { Badge, Button, Drawer, Empty } from "antd";
import { ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { currentUser, TUser } from "../../redux/features/auth/authSlice";
import { removeFromCart, updateQuantity, useCurrentCartProduct } from "../../redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CustomButton from "../buttons/CustomButton";
import CustomButtonS from "../buttons/SecondaryBtn";
import CartItem from "./Cart";


const CartButton: React.FC = () => {
    const cart = useAppSelector(useCurrentCartProduct);
    const user = useAppSelector(currentUser) as TUser;
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    // const [createOrder, { isLoading, isSuccess, data, isError, error }] = useCreateOrderMutation()

    const [isOpen, setIsOpen] = useState(false);

    const toastId = 'cart'

    const handleUpdateQuantity = (id: string, quantity: number) => {
        dispatch(updateQuantity({ id, quantity }));
        toast.success('Product added to cart!', { id: toastId })
    };

    const handleRemoveItem = (id: string) => {
        dispatch(removeFromCart(id));
        toast.error('Product removed from cart!', { id: toastId })
    };


    const handleOpenCheckout = () => {
        if (user && user?.email) {
            setIsOpen(false)
            navigate('/checkout')
        }
        else {
            toast.error('You need to login first!', { id: toastId })
            setIsOpen(false)
            navigate('/login')
        }
    }

    // useEffect(() => {
    //     if (isLoading) toast.loading("Processing...", { id: toastId })
    //     if (isSuccess) {


    //         if (data?.data) {
    //             setTimeout(() => {

    //                 window.location.href = data.data
    //             }, 1000)
    //         }
    //     }
    //     if (isError) toast.error(JSON.stringify(error), { id: toastId })
    // }, [data?.data, data?.message, error, isError, isLoading, isSuccess])

    // Calculate subtotal
    const subtotal = cart.reduce((total, item) => total + item.price * item.orderQuantity, 0);

    return (
        <>
            {/* Cart Button with Badge */}
            <Badge count={cart.length} size="small" offset={[5, 0]}>
                <Button
                    type="text"
                    className="flex items-center"
                    icon={<ShoppingCart size={24} />}
                    onClick={() => setIsOpen(true)}
                />
            </Badge>

            {/* Cart Drawer */}
            <Drawer
                title="SHOPPING CART"
                placement="right"
                onClose={() => setIsOpen(false)}
                open={isOpen}
                width={400}
            >
                {cart.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        <div className="max-h-80 overflow-y-auto space-y-4">
                            {cart?.map((item) => (
                                <CartItem
                                    key={item._id}
                                    item={item}
                                    onUpdateQuantity={handleUpdateQuantity}
                                    onRemove={handleRemoveItem}
                                />
                            ))}

                        </div>

                        {/* Subtotal */}
                        <div className="flex justify-between items-center text-text text-lg font-semibold border-t pt-3">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        {/* Checkout Actions - Stacked on Mobile */}
                        <div className="flex flex-col gap-4  mt-4">


                            <CustomButton text="CHECKOUT" onClick={handleOpenCheckout} disabled={cart.length === 0} />
                            <CustomButtonS text="CONTINUE SHOPPING" onClick={() => navigate("/products")} type="default" />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center h-32">
                        <Empty description="Your cart is empty" />
                        <Link to="/all-products" className="mt-4">
                            <CustomButtonS text="CONTINUE SHOPPING" onClick={() => navigate("/products")} type="default" />
                        </Link>
                    </div>
                )}
            </Drawer>
        </>
    );
};

export default CartButton;
