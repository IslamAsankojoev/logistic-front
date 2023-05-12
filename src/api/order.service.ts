import { api } from './interceptor';

export const OrderService = {
  find: async () => {
    let response = await api.get('/Order/');
    return response;
  },
  findOne: async (id: number) => {
    let response = await api.get(`/Order/${id}/`);
    return response;
  },
  create: async (data: any) => {
    let response = await api.post('/Order/', data);
    return response;
  },
  update: async (id: number, data: any) => {
    let response = await api.put(`/Order/${id}/`, data);
    return response;
  },
  delete: async (id: number) => {
    let response = await api.delete(`/Order/${id}/`);
    return response;
  },
};
