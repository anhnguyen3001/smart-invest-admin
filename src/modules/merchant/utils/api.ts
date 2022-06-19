import API from 'services/request';
import { getCurrentMerchant } from 'utility/Utils';

const merchantApi = {
  getOwnedMarketMerchant: async () => {
    return API.marketBffClientProtected
      .get('/v1/get-owned-merchants')
      .then((res) => res.data?.data?.merchants || []);
  },
  getOwnedLBMerchant: async () => {
    return API.builderBffClient
      .get('/v1/merchants/me')
      .then((res) => res.data?.data?.merchants || []);
  },
  createMerchant: async (data) => {
    return API.builderBffClient
      .post(`/v1/merchants`, data)
      .then((res) => res.data);
  },
  getUsers: async (params) => {
    const merchantId = getCurrentMerchant();
    return API.builderBffClient
      .get(`/v1/merchants/${merchantId}/users`, {
        params,
      })
      .then((res) => res.data);
  },
  deleteUser: async (iamId) => {
    const merchantId = getCurrentMerchant();
    return API.builderBffClient.delete(
      `/v1/merchants/${merchantId}/users/${iamId}`,
    );
  },
  addUser: async (body) => {
    const merchantId = getCurrentMerchant();
    return API.builderBffClient.post(`/v1/merchants/${merchantId}/users`, body);
  },
  updateMerchant: (data) => {
    const merchantId = getCurrentMerchant();
    return API.builderBffClient
      .patch(`/v1/merchants/${merchantId}`, data)
      .then((res) => res.data);
  },
};

export default merchantApi;
