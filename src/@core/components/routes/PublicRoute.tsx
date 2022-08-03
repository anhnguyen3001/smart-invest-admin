import { Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppSelector } from 'redux/store';
import { HOME } from 'router/path';
import { RouteProps } from './common';

const PublicRoute: React.FC<RouteProps> = ({ children }) => {
  const user = useAppSelector((state) => state.auth.user);

  if (user) {
    return <Redirect to={HOME} />;
  }

  return <Suspense fallback={null}> {children} </Suspense>;
};

export default PublicRoute;
