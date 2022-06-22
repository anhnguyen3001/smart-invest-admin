import { BaseSearchQueryParams } from 'modules/core/types';

export type GetPermissionsParams = BaseSearchQueryParams;

export interface Permission {
  id: number;
  name: string;
  code: string;
}

export interface CreatePermissionRequest {
  name: string;
  code: string;
}

export interface UpdatePermissionRequest {
  name: string;
}
