import { fetchUserInfo } from 'utility/Utils';
import TekoMarket from 'teko-market-v1';
import { KEY_USER_LS } from 'configs/constants';
import { useAppSelector } from 'redux/store';

export const useUserInfo = () => {
  const authStore = useAppSelector((state) => state.auth);
  const initingIam = authStore?.initingIam;
  const canBeCallPrivateApi = !initingIam;

  const getUserInfoSync = () => {
    if (typeof TekoMarket?.auth?.user?.getUserInfo === 'function') {
      return TekoMarket.auth.user.getUserInfo();
    }
    const userInfo = localStorage.getItem(KEY_USER_LS);
    if (userInfo) {
      try {
        return JSON.parse(userInfo);
      } catch {
        return null;
      }
    }
    return null;
  };

  const removeUserInfo = () => {
    localStorage.removeItem(KEY_USER_LS);
  };

  return {
    getUserInfoSync,
    canBeCallPrivateApi,
    removeUserInfo,
  };
};
