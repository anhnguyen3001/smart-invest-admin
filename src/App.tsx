import SpinnerComponent from '@core/components/spinner/Fallback-spinner';
import { LS_KEY } from 'modules/core';
import { userApi } from 'modules/user/utils/api';
import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import {
  handleUpdateAccessToken,
  handleUpdateInitingIam,
  handleUpdateUser,
} from 'redux/authentication';
import { useAppSelector } from 'redux/store';
import { setupInterceptor } from 'services/request';
import Router from './router/Router';
import { Routes } from './router/routes';

const App = () => {
  const dispatch = useDispatch();

  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const initingIam = useAppSelector((state) => state.auth.initingIam);

  useEffect(() => {
    const { accessToken } = JSON.parse(
      localStorage.getItem(LS_KEY.userInfo) || '{}',
    );

    if (accessToken) {
      dispatch(handleUpdateAccessToken(accessToken));
    } else {
      dispatch(handleUpdateInitingIam(false));
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setupInterceptor(accessToken);

    const fetchUser = async () => {
      try {
        const res = await userApi.me();

        dispatch(handleUpdateUser(res.data.user));
        dispatch(handleUpdateInitingIam(false));
      } catch (e) {
        console.error(e);
      }
    };

    if (accessToken) {
      fetchUser();
    }

    // eslint-disable-next-line
  }, [accessToken]);

  return initingIam ? (
    <SpinnerComponent />
  ) : (
    <Suspense fallback={<SpinnerComponent />}>
      <Switch>
        <Router routes={Routes} />
      </Switch>
    </Suspense>
  );
};

export default App;
