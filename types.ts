// FIX: Removed a self-import of 'Product' that conflicted with the local interface declaration.

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  name: string;
  email: string;
}

export interface Sale {
  id: string;
  items: CartItem[];
  date: string;
  total: number;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  country: string;
  googleMapsLink?: string;
  isDefault?: boolean;
}
