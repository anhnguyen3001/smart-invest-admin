import { useState } from 'react';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState();

  const onLogin = async (data) => {};
};
