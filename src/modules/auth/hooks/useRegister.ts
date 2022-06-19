import { useState } from 'react';
import { IAM_AUTH_ERROR_CODE } from '../constants/code';
import { RegisterRequest } from '../types';
import { authApi } from '../utils/api';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const [errMsg, setErrMsg] = useState();

  const onRegister = async (data: RegisterRequest) => {
    setLoading(true);

    try {
      await authApi.register(data);
    } catch (error) {
      console.error(error);

      const code = error?.response?.data?.code;
      let errMsg;

      switch (code) {
        case IAM_AUTH_ERROR_CODE.USER_EXISTED:
          errMsg = 'Số điện thoại đã tồn tại!';
          break;
        default:
          errMsg = 'Hệ thống đang có lỗi, vui lòng thử lại sau!';
      }

      setErrMsg(errMsg);

      setLoading(false);
    }
  };

  return {
    loading,
    errMsg,
    onRegister,
  };
};
