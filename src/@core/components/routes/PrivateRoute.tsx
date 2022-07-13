import { Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppSelector } from 'redux/store';
import { NOT_FOUND, LOGIN } from 'router/path';
import { checkPermission } from 'utility/Utils';
import { RouteProps } from './common';

const PrivateRoute: React.FC<RouteProps> = ({ children, route }) => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return <Redirect to={LOGIN} />;
  }

  if (!checkPermission(route.meta, user)) {
    return <Redirect to={NOT_FOUND} />;
  }

  return <Suspense fallback={null}> {children}</Suspense>;
};

export default PrivateRoute;
