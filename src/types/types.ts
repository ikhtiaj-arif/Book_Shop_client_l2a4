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
export interface IBook {
  _id: string;
  title: string; // Book title
  author: string; // Author name
  description: string; // Full book description
  category: ICategory; // Main category
  price: number; // Current price
  originalPrice?: number; // Original price (for discounts)
  isbn: string; // ISBN number
  publisher: string; // Publisher name
  publishedDate: string; // Publication date (ISO format)
  language: string; // Book language
  pages: number; // Number of pages
  format: string; // Format (hardcover, paperback, ebook)
  dimensions?: string; // Physical dimensions
  weight?: string; // Weight
  images: string; // Array of image URLs
  rating: number; // Average rating (1-5)
  reviewCount: number; // Number of reviews
  inStock: boolean; // Availability status
  stockQuantity: number; // Number of copies in stock
  tags: string[]; // Related tags/keywords
  featured: boolean; // Is featured book
  bestseller: boolean; // Is bestseller
  newArrival: boolean; // Is new arrival
  discount?: number; // Discount percentage
  createdAt: string; // Creation timestamp (ISO format)
  updatedAt: string; // Last update timestamp (ISO format)
}

export interface ICategory {
  _id: string;
  name: string;
  image: string;
  count: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
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
