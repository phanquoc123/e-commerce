// Mock API Response Types

export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  parent?: {
    id: number;
    name: string;
    slug: string;
  };
  children?: Category[];
}

export interface Color {
  id: number;
  name: string;
  hex: string;
  image?: string;
}

export interface Size {
  id: number;
  name: string;
  code: string;
  stock?: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  colors?: Color[];
  rating?: number;
  reviewCount?: number;
}

export interface Collection {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image: string;
  products?: Product[];
}

export interface ProductDetail {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  images: string[];
  rating: number;
  reviewCount: number;
}

export interface ProductVariant {
  id: number;
  sku: string;
  price: number;
  originalPrice: number;
  discount: number;
  stock: number;
  color: Color;
  size: Size;
}

export interface ProductDetailResponse {
  product: ProductDetail;
  variant: ProductVariant;
  availableColors: Color[];
  availableSizes: Size[];
}

