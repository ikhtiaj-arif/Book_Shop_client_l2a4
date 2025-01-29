import { Badge, Button, Drawer, Empty } from "antd";
import { ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, updateQuantity, useCurrentCartProduct } from "../../redux/features/cart/cartSlice";
import { useAppSelector } from "../../redux/hooks";
import { IProduct } from "../../types/types";
import TButton from "../buttons/TButton";
import CartItem from "./Cart";


const CartButton: React.FC = () => {
    const cart = useAppSelector(useCurrentCartProduct) as IProduct[];
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const handleUpdateQuantity = (id: string, quantity: number) => {
        dispatch(updateQuantity({ id, quantity }));
    };

    const handleRemoveItem = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const confirmOrder = async () => {
        console.log("Order confirmed!");
    };

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
                            {cart.map((item) => (
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

                            <TButton
                                text="CHECKOUT"

                                onClick={confirmOrder}
                            >

                            </TButton>
                            <button className="w-full py-2 px-4 mt-auto text-primary font-semibold rounded-2xl shadow-md border border-primary transition-all">
                                <Link to="/all-products">
                                    CONTINUE SHOPPING

                                </Link>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center h-32">
                        <Empty description="Your cart is empty" />
                        <Link to="/all-products" className="mt-4">
                            <Button type="primary">Continue Shopping</Button>
                        </Link>
                    </div>
                )}
            </Drawer>
        </>
    );
};

export default CartButton;
