import axiosInstance from '../api/axios';

export const collectionService = {
  getAllCollectionWithProducts: () => axiosInstance.get('/collections/with-products'),
  //   getCategoryById: (id: number) => axiosInstance.get(`/categories/${id}`),
  //   createCategory: (data: any) => axiosInstance.post('/categories', data),
};
