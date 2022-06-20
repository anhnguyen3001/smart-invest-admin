import { BaseSearchQueryParams } from 'modules/core/types';

export type GetUsersParams = BaseSearchQueryParams & {
  isVerified?: boolean;
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
  password?: string;
  username: string;
  method: LoginMethodEnum;
  isVerified: boolean;
  role?: Role;
  updatedAt?: string;
}

export interface UpdateUserRequest {
  password?: string;
  isVerified?: boolean;
  roleId?: number;
}
