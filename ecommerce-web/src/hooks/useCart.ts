import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartService, type Cart, type AddToCartPayload } from '../services/cartService';

// Query keys
const CART_QUERY_KEY = ['cart'];

// Get cart hook
export const useCart = () => {
  return useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: async () => {
      try {
        const response = await cartService.getCart();
        const data = response.data?.data?.result as Cart;
        return data;
      } catch (error) {
        console.error('❌ Error fetching cart:', error);
        return {
          items: [],
          totalItems: 0,
          totalPrice: 0,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    staleTime: 0, // Always fetch fresh cart data
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Add to cart hook
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AddToCartPayload) => {
      const response = await cartService.addToCart(payload);
      return response.data?.data?.result as Cart;
    },
    onSuccess: (data) => {
      // Update cart cache
      queryClient.setQueryData(CART_QUERY_KEY, data);
      console.log('✅ Item added to cart successfully');
    },
    onError: (error: any) => {
      console.error('❌ Error adding to cart:', error);
      const message = error.response?.data?.data?.message || 'Failed to add item to cart';
      throw new Error(message);
    },
  });
};

// Update cart item hook
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      const response = await cartService.updateCartItem(itemId, quantity);
      return response.data?.data?.result as Cart;
    },
    onSuccess: (data) => {
      // Update cart cache
      queryClient.setQueryData(CART_QUERY_KEY, data);
      console.log('✅ Cart item updated successfully');
    },
    onError: (error: any) => {
      console.error('❌ Error updating cart item:', error);
      const message = error.response?.data?.data?.message || 'Failed to update cart item';
      throw new Error(message);
    },
  });
};

// Remove cart item hook
export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string) => {
      const response = await cartService.removeCartItem(itemId);
      return response.data?.data?.result as Cart;
    },
    onSuccess: (data) => {
      // Update cart cache
      queryClient.setQueryData(CART_QUERY_KEY, data);
      console.log('✅ Item removed from cart successfully');
    },
    onError: (error: any) => {
      console.error('❌ Error removing cart item:', error);
      const message = error.response?.data?.data?.message || 'Failed to remove item from cart';
      throw new Error(message);
    },
  });
};

// Clear cart hook
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await cartService.clearCart();
      return response.data?.data?.result as Cart;
    },
    onSuccess: (data) => {
      // Update cart cache
      queryClient.setQueryData(CART_QUERY_KEY, data);
      console.log('✅ Cart cleared successfully');
    },
    onError: (error: any) => {
      console.error('❌ Error clearing cart:', error);
      const message = error.response?.data?.data?.message || 'Failed to clear cart';
      throw new Error(message);
    },
  });
};

