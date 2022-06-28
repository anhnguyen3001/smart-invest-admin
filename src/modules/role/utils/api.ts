import API from 'services/request';
import { CreateRoleRequest, GetRolesParams, UpdateRoleRequest } from '../types';

export const roleApi = {
  getRoles: async (params: GetRolesParams) => {
    return API.adminBffClient.get(`/roles`, { params }).then((res) => res.data);
  },
  createRole: async (id: number, data: CreateRoleRequest) => {
    return API.adminBffClient
      .post(`/roles/${id}`, data)
      .then((res) => res.data);
  },
  updateRole: async (id: number, data: UpdateRoleRequest) => {
    return API.adminBffClient
      .patch(`/roles/${id}`, data)
      .then((res) => res.data);
  },
  deleteRole: async (id: number) => {
    return API.adminBffClient.delete(`/roles/${id}`);
  },
};
