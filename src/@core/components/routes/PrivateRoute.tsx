import { useAuth } from 'modules/core';
import { Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import { LOGIN } from 'router/path';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Redirect to={LOGIN} />;
  }

  return <Suspense fallback={null}> {children}</Suspense>;
};

export default PrivateRoute;
