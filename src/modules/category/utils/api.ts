import API from 'services/request';

export const categoryApi = {
  getAllPublic: async () => {
    return API.publicBuilderBffClient
      .get('/v1/public/categories/get-all')
      .then((res) => res.data);
  },
};
