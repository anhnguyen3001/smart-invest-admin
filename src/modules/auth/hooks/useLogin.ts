import { useUser } from 'modules/user/hooks';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { handleUpdateAccessToken } from 'redux/authentication';
import { HOME } from 'router/path';
import { IAM_AUTH_ERROR_CODE } from '../constants/code';
import { LoginRequest } from '../types';
import { authApi } from '../utils/api';

export const useLogin = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState();

  const { fetchUser } = useUser();

  const onLogin = async (data: LoginRequest) => {
    try {
      setLoading(true);
      const res = await authApi.login(data);

      dispatch(handleUpdateAccessToken(res.data.accessToken));

      await fetchUser();

      history.push(HOME);
    } catch (error) {
      setLoading(false);

      const code = error?.response?.data?.code;
      let errMsg;

      switch (code) {
        case IAM_AUTH_ERROR_CODE.USERNAME_PASSWORD_NOT_CORRECT:
          errMsg = 'Email hoặc mật khẩu không đúng!';
          break;
        case IAM_AUTH_ERROR_CODE.ACCOUNT_NOT_ACTIVATE:
          errMsg = 'Tài khoản không hợp lệ!';
          break;
        default:
          errMsg = 'Hệ thống đang có lỗi, vui lòng thử lại sau!';
      }

      setErrMsg(errMsg);
    }
  };

  return {
    loading,
    errMsg,
    onLogin,
  };
};
