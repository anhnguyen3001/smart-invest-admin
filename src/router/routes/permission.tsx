import { lazy } from 'react';
import { PERMISSION_LIST } from '../path';

const PermissionList = lazy(
  () => import('../../modules/permission/views/PermissionList'),
);

export const PermissionRoutes = [
  {
    path: PERMISSION_LIST,
    component: <PermissionList />,
    meta: {
      publicRoute: false,
    },
  },
];
