import API from 'services/request';

export const authApi = {
  requestLogout: async (challenge) => {
    const {
      data: { redirect_to },
    } = await API.authClient.post(`/v1/requests/logout/${challenge}`, {
      challenge,
      confirmed: true,
    });
    if (redirect_to) window.location.assign(redirect_to);
  },
};
