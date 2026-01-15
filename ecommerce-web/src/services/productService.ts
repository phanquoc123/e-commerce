import axiosInstance from '../api/axios';

export const productService = {
  getProductDetail: (slug: string, colorId: number | null, sizeId: number | null) =>
    axiosInstance.get(`/product-variants/product/${slug}?colorId=${colorId}&sizeId=${sizeId}`),
  searchProducts: (query: string, limit: number = 10) =>
    axiosInstance.get(`/products/search?q=${encodeURIComponent(query)}&limit=${limit}`),
  //   getCategoryById: (id: number) => axiosInstance.get(`/categories/${id}`),
  //   createCategory: (data: any) => axiosInstance.post('/categories', data),
};
