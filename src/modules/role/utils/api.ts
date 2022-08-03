import { adminBffClient } from 'services/request';
import { CreateRoleRequest, GetRolesParams, UpdateRoleRequest } from '../types';

export const roleApi = {
  getAllRoles: async () => {
    return adminBffClient.get(`/roles/get-all`).then((res) => res.data);
  },
  getRoles: async (params: GetRolesParams) => {
    return adminBffClient.get(`/roles`, { params }).then((res) => res.data);
  },
  createRole: async (data: CreateRoleRequest) => {
    return adminBffClient.post(`/roles`, data).then((res) => res.data);
  },
  updateRole: async (id: number, data: UpdateRoleRequest) => {
    return adminBffClient.patch(`/roles/${id}`, data).then((res) => res.data);
  },
  deleteRole: async (id: number) => {
    return adminBffClient.delete(`/roles/${id}`);
  },
};
