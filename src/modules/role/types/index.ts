import { BaseSearchQueryParams } from 'types';
import { Permission } from 'modules/permission/types';

export type GetRolesParams = BaseSearchQueryParams;

export interface Role {
  id: number;
  name: string;
  code: string;
  permissions: Permission[];
}

export interface CreateRoleRequest {
  name: string;
  code: string;
}

export interface UpdateRoleRequest {
  name: string;
}
