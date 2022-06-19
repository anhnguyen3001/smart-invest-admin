import API from 'services/request';
import { normalizeSeparator } from 'utility/Utils';

export const blockApi = {
  getBlocks: async (params) => {
    const { categoryIds, ...restParams } = params;
    return API.builderBffClient
      .get('/v1/blocks', {
        params: { ...restParams, categoryIds: normalizeSeparator(categoryIds) },
      })
      .then((res) => res.data);
  },
  getBlock: async (id) => {
    return API.builderBffClient.get(`/v1/blocks/${id}`).then((res) => res.data);
  },
  updateBlock: async (id, params) => {
    return API.builderBffClient
      .patch(`/v1/blocks/${id}`, params)
      .then((res) => res.data);
  },
  createBlock: async (params) => {
    return API.builderBffClient
      .post(`/v1/blocks`, params)
      .then((res) => res.data);
  },
  deleteBlock: async (id) => {
    return API.builderBffClient
      .delete(`/v1/blocks/${id}`)
      .then((res) => res.data);
  },
  getAllBlocks: async () => {
    return API.builderBffClient
      .get('/v1/blocks/get-all')
      .then((res) => res.data);
  },
};
