import axios from 'axios';
import { handleResponseError } from 'utility/Utils';

const { apiServices } = window.config;

const publicAdminBffClient = axios.create({
  baseURL: apiServices.smartInvestBff,
});

const adminBffClient = axios.create({
  baseURL: apiServices.smartInvestBff,
});

const identityClient = axios.create({
  baseURL: apiServices.identity,
});

// Any status code that lie within the range of 2xx cause this function to trigger
const responseSuccessInterceptor = (response) => {
  // Do something with response data
  return response;
};

// Any status codes that falls outside the range of 2xx cause this function to trigger
const responseErrorInterceptor = (error) => {
  // Do something with response error
  handleResponseError(error);
  console.error(error);
  return Promise.reject(error);
};

export const setupInterceptor = (accessToken: string) => {
  adminBffClient.interceptors.request.use((value) => {
    value.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
  });
  adminBffClient.interceptors.response.use(
    responseSuccessInterceptor,
    responseErrorInterceptor,
  );
};

// eslint-disable-next-line
export default {
  publicAdminBffClient,
  adminBffClient,

  identityClient,
};
