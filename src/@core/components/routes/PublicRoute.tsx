import { Suspense } from 'react';
import { RouteProps } from './common';

const PublicRoute: React.FC<RouteProps> = ({ children }) => {
  return <Suspense fallback={null}> {children} </Suspense>;
};

export default PublicRoute;
