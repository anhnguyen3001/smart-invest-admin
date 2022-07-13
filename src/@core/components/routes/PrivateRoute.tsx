import { Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppSelector } from 'redux/store';
import { LOGIN } from 'router/path';

const PrivateRoute = ({ children }) => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return <Redirect to={LOGIN} />;
  }

  return <Suspense fallback={null}> {children}</Suspense>;
};

export default PrivateRoute;
