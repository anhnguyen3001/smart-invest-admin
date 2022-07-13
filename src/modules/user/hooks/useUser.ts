import { useDispatch } from 'react-redux';
import { handleUpdateUser } from 'redux/authentication';
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

  return { fetchUser };
};
