import { BaseSearchQueryParams } from 'modules/core/types';
import { Permission } from 'modules/permission/types';

export enum MethodEnum {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
}

export type GetRoutesParams = BaseSearchQueryParams & {
  permissionIds?: number[];
};

export interface Route {
  id: number;
  name: string;
  regUri: string;
  method: MethodEnum;
  permission?: Permission;
}

export interface CreateRouteRequest {
  name: string;
  regUri: string;
  method: MethodEnum;
  permissionId?: number;
}

export type UpdateRouteRequest = Partial<CreateRouteRequest>;
