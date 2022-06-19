import API from 'services/request';
import { getCurrentMerchant } from 'utility/Utils';

const pageApi = {
  getPages: async (params) => {
    const { data } = await API.builderBffClient.get('/v1/pages', {
      params: {
        ...params,
        merchantIds: getCurrentMerchant(),
      },
    });
    return data;
  },
  createPage: async (body) => {
    const { data } = await API.builderBffClient.post(`/v1/pages`, {
      ...body,
      merchantId: getCurrentMerchant(),
    });
    return data;
  },
  updatePage: async (id, body) => {
    return await API.builderBffClient.patch(`/v1/pages/${id}`, body);
  },
  getPage: async (id, params?: any) => {
    const { data } = await API.builderBffClient.get(`/v1/pages/${id}`, {
      params,
    });
    return data;
  },
  deletePage: (id) => {
    return API.builderBffClient.delete(`/v1/pages/${id}`);
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

export default pageApi;
