import { adminBffClient } from 'services/request';
import {
  CreateRouteRequest,
  GetRoutesParams,
  UpdateRouteRequest,
} from '../types';

export const routeApi = {
  getRoutes: async (params: GetRoutesParams) => {
    return adminBffClient.get(`/routes`, { params }).then((res) => res.data);
  },
  createRoute: async (data: CreateRouteRequest) => {
    return adminBffClient.post('/routes', data).then((res) => res.data);
  },
  updateRoute: async (id: number, data: UpdateRouteRequest) => {
    return adminBffClient.patch(`/routes/${id}`, data).then((res) => res.data);
  },
  deleteRoute: async (id: number) => {
    return adminBffClient.delete(`/routes/${id}`);
  },
};
