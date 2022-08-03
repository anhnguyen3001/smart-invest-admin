import { lazy } from 'react';
import { ROLE_LIST } from '../path';

const RoleList = lazy(() => import('../../modules/role/views/RoleList'));

export const RoleRoutes = [
  {
    path: ROLE_LIST,
    component: <RoleList />,
    meta: {
      publicRoute: false,
    },
  },
];
