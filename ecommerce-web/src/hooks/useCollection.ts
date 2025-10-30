import { useQuery } from '@tanstack/react-query';
import { collectionService } from '../services/collectionService';

// Backend response wrapper type
// interface ApiResponse<T> {
//   data: {
//     status: number;
//     message: string;
//     success: boolean;
//     result: T;
//   };
// }

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

// Query Keys
export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: (filters: string) => [...categoryKeys.lists(), { filters }] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (id: number) => [...categoryKeys.details(), id] as const,
};

// Get all categories hook
export const useCollectionWithProducts = () => {
  return useQuery({
    queryKey: ['collectionWithProducts'],
    queryFn: async () => {
      try {
        const response = await collectionService.getAllCollectionWithProducts();
        // console.log('📦 Full response:', response);
        // console.log('📋 Response.data:', response.data);

        // Backend response format: { data: { data: { result: [...] } } }
        const result = response.data?.data?.result;
        // console.log('✅ Parsed result:', result);

        return result;
      } catch (error) {
        console.error('❌ Error in collectionWithProducts:', error);
        // return []; // Return empty array to prevent undefined error
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
