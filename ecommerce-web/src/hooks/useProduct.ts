import { useQuery } from '@tanstack/react-query';

import { productService } from '../services/productService';

export interface CategoryBrief {
  id: number;
  name: string;
  slug: string;
}

export interface ProductInCollection {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  isActive: boolean;
  category: CategoryBrief;
  displayOrder?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Collection {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  thumbnailUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  products?: ProductInCollection[];
  productCount?: number;
}

// ===== Product Detail Types (from backend) =====
export interface ProductImageItem {
  id: number;
  imageUrl: string;
  isMain: boolean;
  sortOrder: number;
}

export interface ProductSizeItem {
  id: number;
  name: string;
  code: string;
}

export interface ProductColorItem {
  id: number; // colorId
  name: string;
  code: string; // e.g. "black"
  hexCode: string | null;
  thumbnailUrl: string | null;
  productColorId: number; // id in product_colors
  images: ProductImageItem[];
  sizes: ProductSizeItem[];
  variants: Array<{
    id: number;
    sku: string;
    price: number;
    stock: number;
    status: 'active' | 'inactive';
    sizeId: number | null;
    sizeName?: string;
    sizeCode?: string;
  }>;
}

export interface ProductVariantItem {
  id: number;
  sku: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  colorId: number | null; // colors.id
  productColorId: number | null; // product_colors.id
  sizeId: number | null; // product_sizes.id
  color: {
    id: number;
    name: string;
    code: string;
    hexCode: string | null;
  } | null;
  size: { id: number; name: string; code: string } | null;
  images: ProductImageItem[]; // images of the color of this variant
}

export interface ProductDetailResult {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  salePrice: number | null;
  discountPercent: number | null;
  isActive: boolean;
  category: CategoryBrief | null;
  selectedColorId: number | null;
  selectedSizeId: number | null;
  colors: ProductColorItem[];
  variants: ProductVariantItem[];
  createdAt: string;
  updatedAt: string;
}
// Get all categories hook
export const useProductDetail = (slug: string, colorId: number | null, sizeId: number | null) => {
  return useQuery({
    queryKey: ['productDetail', slug], // Chỉ dùng slug - không fetch lại khi đổi màu/size
    queryFn: async () => {
      try {
        const response = await productService.getProductDetail(slug, colorId, sizeId);
        const data = response.data?.data?.result as ProductDetailResult;

        return data;
      } catch (error) {
        console.error('❌ Error in productDetail:', error);
        return null;
      }
    },
    enabled: !!slug, // đảm bảo chỉ chạy khi có slug
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
