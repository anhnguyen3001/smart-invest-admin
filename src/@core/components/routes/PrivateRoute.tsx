import { Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppSelector } from 'redux/store';
import { LOGIN } from 'router/path';

const PrivateRoute = ({ children }) => {
  const currentUser = useAppSelector((state) => state.auth.user);

  if (!currentUser) {
    return <Redirect to={LOGIN} />;
  }

  return <Suspense fallback={null}> {children}</Suspense>;
};

export default PrivateRoute;
