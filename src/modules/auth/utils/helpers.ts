import { LS_KEY } from 'modules/core';

export const logout = () => {};

export const setLSAccessToken = (accessToken: string) => {
  localStorage.setItem(LS_KEY.accessToken, accessToken);
};

export const removeLSAccessToken = () => {
  localStorage.removeItem(LS_KEY.accessToken);
};
