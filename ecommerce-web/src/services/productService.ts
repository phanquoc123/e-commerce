import axiosInstance from '../api/axios';

export const productService = {
  getProductDetail: (slug: string) => axiosInstance.get(`/product-variants/product/${slug}`),
  //   getCategoryById: (id: number) => axiosInstance.get(`/categories/${id}`),
  //   createCategory: (data: any) => axiosInstance.post('/categories', data),
};
