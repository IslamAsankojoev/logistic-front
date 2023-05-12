import { api } from './interceptor';

export const ProductService = {
  find: async () => {
    let response = await api.get('/Product/');
    return response;
  },
  findOne: async (id: number) => {
    let response = await api.get(`/Product/${id}/`);
    return response;
  },
  create: async (data: any) => {
    let response = await api.post('/Product/', data);
    return response;
  },
  update: async (id: number, data: any) => {
    let response = await api.put(`/Product/${id}/`, data);
    return response;
  },
  delete: async (id: number) => {
    let response = await api.delete(`/Product/${id}/`);
    return response;
  },
};
