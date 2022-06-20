import { lazy } from 'react';
import { USER_LIST } from '../path';

const UserList = lazy(() => import('../../modules/user/views/UserList'));

export const UserRoutes = [
  {
    path: USER_LIST,
    component: <UserList />,
    meta: {
      publicRoute: true,
    },
  },
];
