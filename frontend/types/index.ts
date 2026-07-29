export interface Address {
  line1: string;
  city: string;
  district: string;
  zip: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  gender?: "male" | "female" | "other" | "";
  dateOfBirth?: string;
  rewardPoints?: number;
  address?: Address;
  role: "customer" | "admin";
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  category: string;
  images: string[];
  isActive: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  priceAtAdd: number;
}

export interface Cart {
  user: string;
  items: CartItem[];
}