import SpinnerComponent from '@core/components/spinner/Fallback-spinner';
import { LS_KEY } from 'modules/core';
import { useUser } from 'modules/user/hooks';
import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import {
  handleUpdateAccessToken,
  handleUpdateInitingIam,
} from 'redux/authentication';
import { useAppSelector } from 'redux/store';
import { setupInterceptor } from 'services/request';
import Router from './router/Router';
import { Routes } from './router/routes';

const App = () => {
  const dispatch = useDispatch();

  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const initingIam = useAppSelector((state) => state.auth.initingIam);

  const { fetchUser } = useUser();

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

    const initUser = async () => {
      const error = await fetchUser();
      if (!error) {
        dispatch(handleUpdateInitingIam(false));
      }
    };

    if (accessToken) {
      initUser();
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
