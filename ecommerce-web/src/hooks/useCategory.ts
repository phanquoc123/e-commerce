import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '../services/categoryService';

// Backend response wrapper type
interface ApiResponse<T> {
  data: {
    status: number;
    message: string;
    success: boolean;
    result: T;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  thumbnail: string | null;
  parentId: number | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  children?: Category[];
}

interface CreateCategoryData {
  name: string;
  thumbnail?: string | null;
  parentId?: number | null;
  isActive?: boolean;
  sortOrder?: number;
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
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const response = await categoryService.getAllCategories();
        const result = response.data?.data?.result || response.data?.result || [];
        return result;
      } catch (error) {
        console.error('❌ Error in useCategories:', error);
        return []; // Return empty array to prevent undefined error
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get category by ID hook
export const useCategory = (id: number) => {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: async () => {
      const response = await categoryService.getCategoryById(id);
      const apiResponse = response.data as ApiResponse<Category>['data'];
      return apiResponse.result;
    },
    enabled: !!id, // Only run query if id exists
  });
};

// Create category mutation
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCategoryData) => {
      const response = await categoryService.createCategory(data);
      const apiResponse = response.data as ApiResponse<Category>['data'];
      return apiResponse.result;
    },
    onSuccess: () => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
};

// Legacy hook for backward compatibility
export const useCategoryLegacy = () => {
  const query = useCategories();

  return {
    categories: query.data || [],
    loading: query.isLoading,
    error: query.error?.message || null,
    refetch: query.refetch,
  };
};
