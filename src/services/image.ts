import API from './request';

export const imageApi = {
  uploadImage: async (file) => {
    const data = new FormData();

    data.append('file', file);
    const res = await API.imageClient.post('/upload/image', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        cloud: true,
      },
    });
    return res.data;
  },
};
