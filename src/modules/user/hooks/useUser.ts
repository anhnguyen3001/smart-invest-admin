import { LS_KEY } from 'constants/index';
import { useDispatch } from 'react-redux';
import {
  handleUpdateAccessToken,
  handleUpdateUser,
} from 'redux/authentication';
import { userApi } from '../utils/api';

export const useUser = () => {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const res = await userApi.me();

      dispatch(handleUpdateUser(res.data.user));
    } catch (e) {
      console.error(e);
      return e;
    }
  };

  const logout = () => {
    localStorage.removeItem(LS_KEY.accessToken);
    dispatch(handleUpdateUser(null));
    dispatch(handleUpdateAccessToken(undefined));
  };

  return { fetchUser, logout };
};
