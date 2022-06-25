import { BaseSearchQueryParams } from 'modules/core/types';

export type GetRolesParams = BaseSearchQueryParams;

export interface Role {
  id: number;
  name: string;
  code: string;
}

export interface CreateRoleRequest {
  name: string;
  code: string;
}

export interface UpdateRoleRequest {
  name: string;
}
