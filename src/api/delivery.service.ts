import { api } from './interceptor';

export const DeliveryService = {
  find: async () => {
    let response = await api.get('/delivery/');
  },
  findOne: async (id: string) => {
    let { data } = await api.get(`/delivery/${id}/`);
  },
  create: async (data: any) => {
    let response = await api.post('/delivery/', data);
  },
  update: async (id: string, data: any) => {
    let response = await api.put(`/delivery/${id}/`, data);
  },
  delete: async (id: string) => {
    let response = await api.delete(`/delivery/${id}/`);
  },
};
