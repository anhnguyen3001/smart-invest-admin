import API from 'services/request';
import { CreateRoleRequest, GetRolesParams, UpdateRoleRequest } from '../types';

export const roleApi = {
  getAllRoles: async () => {
    return API.adminBffClient.get(`/roles/get-all`).then((res) => res.data);
  },
  getRoles: async (params: GetRolesParams) => {
    return API.adminBffClient.get(`/roles`, { params }).then((res) => res.data);
  },
  createRole: async (data: CreateRoleRequest) => {
    return API.adminBffClient.post(`/roles`, data).then((res) => res.data);
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
