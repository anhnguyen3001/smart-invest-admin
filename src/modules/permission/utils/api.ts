import API from 'services/request';
import {
  CreatePermissionRequest,
  GetPermissionsParams,
  UpdatePermissionRequest,
} from '../types';

export const permissionApi = {
  getAllPermissions: async () => {
    return API.adminBffClient
      .get(`/permissions/get-all`)
      .then((res) => res.data);
  },
  getPermissions: async (params: GetPermissionsParams) => {
    return API.adminBffClient
      .get(`/permissions`, { params })
      .then((res) => res.data);
  },
  createPermission: async (id: number, data: CreatePermissionRequest) => {
    return API.adminBffClient
      .post(`/permissions/${id}`, data)
      .then((res) => res.data);
  },
  updatePermission: async (id: number, data: UpdatePermissionRequest) => {
    return API.adminBffClient
      .patch(`/permissions/${id}`, data)
      .then((res) => res.data);
  },
  deletePermission: async (id: number) => {
    return API.adminBffClient.delete(`/permissions/${id}`);
  },
};
