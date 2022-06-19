import API from './request';
import { getCurrentMerchant } from 'utility/Utils';

const currentMerchantId = getCurrentMerchant();

export const pageApi = {
  getPages: async (params) => {
    const { data } = await API.builderBffClient.get('/v1/pages', {
      params: {
        ...params,
        pageSize: params?.pageSize || 18,
        merchantIds: currentMerchantId,
      },
    });
    return data;
  },
  getPage: async (id, params) => {
    const { data } = await API.builderBffClient.get(`/v1/pages/${id}`, {
      params,
    });
    return data;
  },
  updatePage: async (id, body) => {
    return await API.builderBffClient.patch(`/v1/pages/${id}`, body);
  },
  deletePage: async (id) => {
    return await API.builderBffClient.delete(`/v1/pages/${id}`);
  },
  createPage: async (body) => {
    const { data } = await API.builderBffClient.post(`/v1/pages`, {
      ...body,
      merchantId: currentMerchantId,
    });
    return data?.data;
  },
  publishPage: async (id, body) => {
    const { data } = await API.builderBffClient.post(
      `/v1/pages/${id}/publish`,
      body,
    );
    return data?.data;
  },
  unpublishPage: async (id, body) => {
    const { data } = await API.builderBffClient.post(
      `/v1/pages/${id}/unpublish`,
      body,
    );
    return data?.data;
  },
};
