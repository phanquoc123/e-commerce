import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '../services/categoryService';

export interface Category {
  id: number;
  name: string;
  slug: string;
  thumbnail?: string;
  parent_id?: number | null;
  is_active?: boolean;
  sort_order?: number;
  children?: Category[];
}

interface CreateCategoryData {
  name: string;
  slug: string;
  icon?: string;
  parentId?: number;
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
    queryKey: categoryKeys.all,
    queryFn: async () => {
      try {
        console.log('🚀 Calling categories/tree API...');
        const response = await categoryService.getAllCategories();
        console.log('📦 Full response:', response);
        console.log('📋 Response data:', response.data);
        
        if (!response.data) {
          console.error('❌ No data in response');
          throw new Error('No data received from API');
        }
        
        return response.data;
      } catch (error) {
        console.error('❌ Error in useCategories:', error);
        throw error;
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
      return response.data;
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
      return response.data;
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
