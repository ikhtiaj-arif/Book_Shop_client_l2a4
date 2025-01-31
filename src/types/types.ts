export interface IProduct {
  _id: string;
  title: string;
  author: string;
  price: number;
  category: string;
  quantity: number;
  inStock: boolean;
  description: string;
  imageUrl: string;
  // inStock:boolean
}

export interface IOrderItem {
  product: string;
  quantity: number;
  email: string;
  totalPrice: number;
}

export interface ICartItem {
  _id: string;
  title: string;
  author: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  created_at?: string;
  updated_at?: string;
  __v?: number;
  orderQuantity: number;
}
