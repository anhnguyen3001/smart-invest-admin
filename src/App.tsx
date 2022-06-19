// @flow
import { Suspense, useEffect } from 'react';

// ** Router Import
import Router from './router/Router';

// ** Routes & Default Routes
import { Switch } from 'react-router-dom';
import { Routes } from './router/routes';

// ** Hooks Imports
import SpinnerComponent from '@core/components/spinner/Fallback-spinner';
import { useDispatch } from 'react-redux';
import { useUserInfo } from 'utility/hooks';
import { handleUpdateUser } from './redux/authentication';

const App = () => {
  const dispatch = useDispatch();

  const { getUserInfoSync } = useUserInfo();

  // Lấy user từ localstorage
  useEffect(() => {
    const user = getUserInfoSync();
    dispatch(handleUpdateUser(user));
    // eslint-disable-next-line
  }, []);

  return (
    <Suspense fallback={<SpinnerComponent />}>
      <Switch>
        <Router routes={Routes} />
      </Switch>
    </Suspense>
  );
};

export default App;
