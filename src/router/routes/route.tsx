import { lazy } from 'react';
import { ROUTE_LIST } from '../path';

const RouteList = lazy(() => import('../../modules/route/views/RouteList'));

export const RouteRoutes = [
  {
    path: ROUTE_LIST,
    component: <RouteList />,
    meta: {
      publicRoute: false,
    },
  },
];
