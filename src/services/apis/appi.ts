import API from '../request';

export const appiApi = {
  getAppSwitchers: async () => {
    return API.marketBffClient.get('/v1/app-switcher').then((res) => res.data);
  },
};
