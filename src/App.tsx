// @flow
// ** Hooks Imports
import SpinnerComponent from '@core/components/spinner/Fallback-spinner';
import { AuthProvider } from 'modules/core';
import { Suspense } from 'react';
// ** Routes & Default Routes
import { Switch } from 'react-router-dom';
// ** Router Import
import Router from './router/Router';
import { Routes } from './router/routes';

const App = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<SpinnerComponent />}>
        <Switch>
          <Router routes={Routes} />
        </Switch>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
