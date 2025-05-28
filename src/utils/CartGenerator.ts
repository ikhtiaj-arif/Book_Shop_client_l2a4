import { ICartItem, IOrderItem } from "../types/types";

export const processCart = (cart: ICartItem[], email: string): IOrderItem[] => {
  return cart.map((item) => ({
    product: item._id,
    quantity: item.orderQuantity,
    email: email,
    totalPrice: item.price * item.orderQuantity,
  }));
};
