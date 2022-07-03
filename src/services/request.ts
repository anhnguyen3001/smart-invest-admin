import axios from 'axios';
import { handleResponseError } from 'utility/Utils';

const { apiServices } = window.config;

const publicAdminBffClient = axios.create({
  baseURL: apiServices.smartInvestBff,
});

const adminBffClient = axios.create({
  baseURL: apiServices.smartInvestBff,
});

const publicBuilderBffClient = axios.create({
  baseURL: apiServices.builderBff,
});

const builderBffClient = axios.create({
  baseURL: apiServices.builderBff,
});

const marketBffClient = axios.create({
  baseURL: apiServices.marketBff,
});

const marketBffClientProtected = axios.create({
  baseURL: apiServices.marketBff,
});

const publicMarketBffClient = axios.create({
  baseURL: apiServices.marketBff,
});

const imageClient = axios.create({
  baseURL: apiServices.upload,
});

const authClient = axios.create({
  baseURL: apiServices.identity,
});

const identityClient = axios.create({
  baseURL: apiServices.identity,
});

const getAuthorization = () => {
  // return isLoggedIn() ? `Bearer ${getAccessToken()}` : '';
};

// Do something before request is sent
const requestInterceptor = (request) => {
  request.headers.Authorization = getAuthorization();
  return request;
};

// Any status code that lie within the range of 2xx cause this function to trigger
const responseSuccessInterceptor = (response) => {
  // Do something with response data
  return response;
};

// Any status codes that falls outside the range of 2xx cause this function to trigger
const responseErrorInterceptor = (error) => {
  // Do something with response error
  handleResponseError(error);
  return Promise.reject(error);
};

const clients = [
  adminBffClient,
  imageClient,
  builderBffClient,
  marketBffClientProtected,
];

const clientsNoHandleError = [marketBffClient];

const publicClients = [
  publicBuilderBffClient,
  authClient,
  publicMarketBffClient,
];

clients.forEach((client) => {
  client.interceptors.request.use(requestInterceptor);
  client.interceptors.response.use(
    responseSuccessInterceptor,
    responseErrorInterceptor,
  );
});

clientsNoHandleError.forEach((client) => {
  client.interceptors.request.use(requestInterceptor);
  client.interceptors.response.use(responseSuccessInterceptor);
});

publicClients.forEach((client) => {
  client.interceptors.response.use(
    responseSuccessInterceptor,
    responseErrorInterceptor,
  );
});

// eslint-disable-next-line
export default {
  publicAdminBffClient,
  adminBffClient,

  imageClient,
  builderBffClient,
  marketBffClient,
  marketBffClientProtected,
  publicBuilderBffClient,
  authClient,
  identityClient,
  publicMarketBffClient,
};
