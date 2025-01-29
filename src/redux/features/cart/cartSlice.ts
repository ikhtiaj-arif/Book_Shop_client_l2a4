// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../../types/types";
import { RootState } from "../../store";

// interface CartItem {
//   email: string;
//   product: string;
//   quantity: number;
//   totalPrice: number;
//   pricePerItem: number;
// }

// interface CartState {
//   items: CartItem[];
// }

// // Load cart state from local storage
// const loadCartFromLocalStorage = (): CartState => {
//   const storedCart = localStorage.getItem("cart");
//   return storedCart ? JSON.parse(storedCart) : { items: [] };
// };

// const initialState: CartState = loadCartFromLocalStorage();

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<CartItem>) => {
//       const existingItem = state.items.find(
//         (item) => item.product === action.payload.product
//       );
//       if (existingItem) {
//         existingItem.quantity += action.payload.quantity;
//         existingItem.totalPrice =
//           existingItem.quantity * existingItem.pricePerItem;
//       } else {
//         state.items.push(action.payload);
//       }
//       localStorage.setItem("cart", JSON.stringify(state));
//     },

//     removeFromCart: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter(
//         (item) => item.product !== action.payload
//       );
//       localStorage.setItem("cart", JSON.stringify(state));
//     },

//     updateQuantity: (
//       state,
//       action: PayloadAction<{ productId: string; quantity: number }>
//     ) => {
//       const item = state.items.find(
//         (item) => item.product === action.payload.productId
//       );
//       if (item) {
//         item.quantity = action.payload.quantity;
//         item.totalPrice = item.quantity * item.pricePerItem;
//       }
//       localStorage.setItem("cart", JSON.stringify(state));
//     },

//     clearCart: (state) => {
//       state.items = [];
//       localStorage.removeItem("cart");
//     },
//   },
// });

// export const { addToCart, removeFromCart, updateQuantity, clearCart } =
//   cartSlice.actions;
// export default cartSlice.reducer;

interface CartItem extends IProduct {
  quantity: number;
  orderQuantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: IProduct; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;

      const existingItem = state.items.find((item) => item._id === product._id);
      
      if (existingItem) {
        existingItem.orderQuantity += quantity;
      } else {
        state.items.push({ ...product, orderQuantity: quantity });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item._id === action.payload.id);
      if (item) {
        item.orderQuantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const useCurrentCartProduct = (state: RootState) => state.cart.items;
