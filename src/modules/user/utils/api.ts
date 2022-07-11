import API from 'services/request';
import { GetUsersParams, UpdateUserRequest } from '../types';

export const userApi = {
  me: async () => {
    return API.adminBffClient.get(`/users/me`).then((res) => res.data);
  },
  getUsers: async (params: GetUsersParams) => {
    return API.adminBffClient.get(`/users`, { params }).then((res) => res.data);
  },
  updateUser: async (id: number, data: UpdateUserRequest) => {
    return API.adminBffClient
      .patch(`/users/${id}`, data)
      .then((res) => res.data);
  },
  deleteUser: async (id: number) => {
    return API.adminBffClient.delete(`/users/${id}`);
  },
};
