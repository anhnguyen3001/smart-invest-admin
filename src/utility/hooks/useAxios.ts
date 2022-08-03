import { AxiosError } from 'axios';
import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAppSelector } from 'redux/store';
import { adminBffClient } from 'services/request';

export const useAxios = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const handleResponseError = useCallback((error: AxiosError) => {
    const response = error.response;
    const status = response?.status;
    switch (status) {
      case 401:
        // logout();
        toast.error('Phiên sử dụng đã hết hạn.');
        break;
      default:
        // Handle error message from API response
        const code = response?.data?.code;
        let message = null;

        if (error.response && error.response.data) {
          const { data } = error.response;
          message = data?.details?.data?.message || data.message;
        }
        toast.error(`${message || 'Xảy ra vấn đề'}`, {
          duration: 3,
        });
        break;
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    adminBffClient.interceptors.request.use((request) => {
      if (request.headers && accessToken) {
        request.headers.authorization = `Bearer ${accessToken}`;
      }
      return request;
    });
    adminBffClient.interceptors.response.use(undefined, (error) => {
      handleResponseError(error);
      return Promise.reject(error);
    });
    // eslint-disable-next-line
  }, [accessToken]);
};
