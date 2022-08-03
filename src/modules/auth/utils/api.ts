import { publicAdminBffClient } from 'services/request';
import { LoginRequest } from '../types';

export const authApi = {
  login: async (body: LoginRequest) => {
    const { data } = await publicAdminBffClient.post('/auth/login', body);
    return data;
  },
  register: async (body) => {
    const { data } = await publicAdminBffClient.post('/auth/register', body);
    return data;
  },
};
