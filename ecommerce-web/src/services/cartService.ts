import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

export interface CartItem {
  id: string;
  productId: number;
  productName: string;
  productSlug: string;
  variantId: number;
  sku: string;
  colorId: number;
  colorName: string;
  colorHexCode: string | null;
  sizeId: number | null;
  sizeName: string | null;
  sizeCode: string | null;
  price: number;
  quantity: number;
  imageUrl: string;
  stock: number;
  addedAt: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  updatedAt: string;
}

export interface AddToCartPayload {
  productId: number;
  productName: string;
  productSlug: string;
  variantId: number;
  sku: string;
  colorId: number;
  colorName: string;
  colorHexCode: string | null;
  sizeId: number | null;
  sizeName: string | null;
  sizeCode: string | null;
  price: number;
  quantity: number;
  imageUrl: string;
  stock: number;
}

export const cartService = {
  // Get cart
  getCart: () => {
    return axios.get(`${API_BASE_URL}/cart`);
  },

  // Add item to cart
  addToCart: (payload: AddToCartPayload) => {
    return axios.post(`${API_BASE_URL}/cart/items`, payload);
  },

  // Update cart item quantity
  updateCartItem: (itemId: string, quantity: number) => {
    return axios.put(`${API_BASE_URL}/cart/items/${itemId}`, { quantity });
  },

  // Remove cart item
  removeCartItem: (itemId: string) => {
    return axios.delete(`${API_BASE_URL}/cart/items/${itemId}`);
  },

  // Clear cart
  clearCart: () => {
    return axios.delete(`${API_BASE_URL}/cart`);
  },
};

