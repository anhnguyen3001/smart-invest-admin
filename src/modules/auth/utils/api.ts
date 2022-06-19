import API from 'services/request';

const { iam } = window.config;

export const authApi = {
  requestLogin: async (challenge: string) => {
    const { data } = await API.identityClient.get(
      `/v1/requests/login/${challenge}`,
    );
    return data;
  },
  login: async (body) => {
    const { data } = await API.identityClient.post('/v1/users/login', body);
    return data;
  },
  register: async (body) => {
    // API doc: https://api-doc.vnpay.vn/project-doc/draft/saas_market/presentation_layer/market_bff/version/da404108/operations/register-user-with-merchant
    const { data } = await API.publicMarketBffClient.post(
      '/v1/auth/register',
      body,
      {
        headers: {
          'x-client-id': iam.clientId,
        },
      },
    );
    return data;
  },
  verifyPhone: async (body) => {
    // API doc: https://api-doc.vnpay.vn/project-doc/draft/saas_market/presentation_layer/market_bff/version/da404108/operations/verify-phone
    const { data } = await API.publicMarketBffClient.post(
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
