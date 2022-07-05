import API from 'services/request';
import {
  CreateRouteRequest,
  GetRoutesParams,
  UpdateRouteRequest,
} from '../types';

export const routeApi = {
  getRoutes: async (params: GetRoutesParams) => {
    return API.adminBffClient
      .get(`/routes`, { params })
      .then((res) => res.data);
  },
  createRoute: async (data: CreateRouteRequest) => {
    return API.adminBffClient.post('/routes', data).then((res) => res.data);
  },
  updateRoute: async (id: number, data: UpdateRouteRequest) => {
    return API.adminBffClient
      .patch(`/routes/${id}`, data)
      .then((res) => res.data);
  },
  deleteRoute: async (id: number) => {
    return API.adminBffClient.delete(`/routes/${id}`);
  },
};
