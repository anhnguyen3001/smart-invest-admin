import { useState } from 'react';
import { IAM_AUTH_ERROR_CODE } from '../constants/code';
import { LoginRequest } from '../types';
import { authApi } from '../utils/api';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState();

  const onLogin = async (data: LoginRequest) => {
    try {
      setLoading(true);
      await authApi.login(data);
    } catch (error) {
      setLoading(false);

      const code = error?.response?.data?.code;
      let errMsg;

      switch (code) {
        case IAM_AUTH_ERROR_CODE.USERNAME_PASSWORD_NOT_CORRECT:
          errMsg = 'Số điện thoai hoặc mật khẩu không đúng!';
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