import API from 'services/request';
import { GetPermissionsParams, UpdatePermissionRequest } from '../types';

export const permissionApi = {
  getPermissions: async (params: GetPermissionsParams) => {
    return API.adminBffClient
      .get(`/permissions`, { params })
      .then((res) => res.data);
  },
  updatePermission: async (id: number, data: UpdatePermissionRequest) => {
    return API.adminBffClient
      .patch(`/users/${id}`, data)
      .then((res) => res.data);
  },
  deletePermission: async (id: number) => {
    return API.adminBffClient.delete(`/permissions/${id}`);
  },
};
