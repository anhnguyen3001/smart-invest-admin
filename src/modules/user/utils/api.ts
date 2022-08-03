import { adminBffClient } from 'services/request';
import { GetUsersParams, UpdateUserRequest } from '../types';

export const userApi = {
  me: async () => {
    return adminBffClient.get(`/me`).then((res) => res.data);
  },
  getUsers: async (params: GetUsersParams) => {
    return adminBffClient.get(`/users`, { params }).then((res) => res.data);
  },
  updateUser: async (id: number, data: UpdateUserRequest) => {
    return adminBffClient.patch(`/users/${id}`, data).then((res) => res.data);
  },
  deleteUser: async (id: number) => {
    return adminBffClient.delete(`/users/${id}`);
  },
};
