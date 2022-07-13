import API from 'services/request';
import { LoginRequest } from '../types';

const { iam } = window.config;

export const authApi = {
  requestLogin: async (challenge: string) => {
    const { data } = await API.identityClient.get(
      `/v1/requests/login/${challenge}`,
    );
    return data;
  },
  login: async (body: LoginRequest) => {
    const { data } = await API.publicAdminBffClient.post('/auth/login', body);
    return data;
  },
  register: async (body) => {
    const { data } = await API.publicAdminBffClient.post(
      '/auth/register',
      body,
    );
    return data;
  },
  verifyPhone: async (body) => {
    const { data } = await API.publicAdminBffClient.post(
      '/v1/auth/verify-otp',
      body,
      {
        headers: {
          'x-client-id': iam.clientId,
        },
      },
    );
    return data;
  },
  resendActivationCode: async (body) => {
    const { data } = await API.identityClient.post(
      '/v1/users/activation/resend',
      {
        ...body,
        client_id: iam.clientId,
      },
    );
    return data;
  },
};
