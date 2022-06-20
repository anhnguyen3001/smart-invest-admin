import API from 'services/request';
import { GetUsersParams, UpdateUserRequest } from '../types';

export const userApi = {
  getUsers: async (params: GetUsersParams) => {
    return API.adminBffClient.get(`/users`, { params }).then((res) => res.data);
  },
  updateUser: async (userId: number, data: UpdateUserRequest) => {
    return API.adminBffClient
      .patch(`/users/${userId}`, data)
      .then((res) => res.data);
  },
  deleteUser: async (userId: number) => {
    return API.adminBffClient.delete(`/users/${userId}`);
  },
};
