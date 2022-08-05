import { Permission } from 'modules/permission/types';
import { BaseSearchQueryParams } from 'types';

export type GetUsersParams = BaseSearchQueryParams & {
  isVerified?: string;
};

export enum LoginMethodEnum {
  local = 'local',
  facebook = 'facebook',
  google = 'google',
}

export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  avatar?: string;
  method: LoginMethodEnum;
  isVerified: boolean;
  role?: Role;
  updatedAt?: string;
  permissions: Permission[];
}

export interface UpdateUserRequest {
  isVerified?: boolean;
  roleId?: number;
}
