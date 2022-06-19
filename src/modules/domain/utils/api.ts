import API from 'services/request';
import { getCurrentMerchant } from 'utility/Utils';

const merchantId = getCurrentMerchant();

export const domainApi = {
  getAllDomains: async () => {
    return API.builderBffClient
      .get(`/v1/merchants/${merchantId}/domains/get-all`)
      .then((res) => res.data);
  },
  getDomains: async (params) => {
    return API.builderBffClient
      .get(`/v1/merchants/${merchantId}/domains`, { params })
      .then((res) => res.data);
  },
  createDomain: async (body) => {
    const { data } = await API.builderBffClient.post(
      `/v1/merchants/${merchantId}/domains`,
      body,
    );
    return data;
  },
  deleteDomain: (id) => {
    return API.builderBffClient.delete(`/v1/domains/${id}`);
  },
  verifyDomain: (id) => {
    return API.builderBffClient.post(`/v1/domains/${id}/verify`);
  },
};
