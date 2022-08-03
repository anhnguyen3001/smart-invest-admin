import { adminBffClient } from 'services/request';
import {
  CreatePermissionRequest,
  GetPermissionsParams,
  UpdatePermissionRequest,
} from '../types';

export const permissionApi = {
  getAllPermissions: async () => {
    return adminBffClient.get(`/permissions/get-all`).then((res) => res.data);
  },
  getPermissions: async (params: GetPermissionsParams) => {
    return adminBffClient
      .get(`/permissions`, { params })
      .then((res) => res.data);
  },
  createPermission: async (data: CreatePermissionRequest) => {
    return adminBffClient.post('/permissions', data).then((res) => res.data);
  },
  updatePermission: async (id: number, data: UpdatePermissionRequest) => {
    return adminBffClient
      .patch(`/permissions/${id}`, data)
      .then((res) => res.data);
  },
  deletePermission: async (id: number) => {
    return adminBffClient.delete(`/permissions/${id}`);
  },
};
