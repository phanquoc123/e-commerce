import axiosInstance from '../api/axios';

export const categoryService = {
  getAllCategories: () => axiosInstance.get('/categories/tree'),
  getCategoryById: (id: number) => axiosInstance.get(`/categories/${id}`),
  createCategory: (data: any) => axiosInstance.post('/categories', data),
};
