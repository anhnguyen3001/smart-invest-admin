import { lazy } from 'react';
import { ACTION, RESOURCES } from 'router/permission';
import { USER_LIST } from '../path';

const UserList = lazy(() => import('../../modules/user/views/UserList'));

export const UserRoutes = [
  {
    path: USER_LIST,
    component: <UserList />,
    meta: {
      publicRoute: false,
      permission: {
        resource: RESOURCES.USER,
        action: ACTION.READ,
      },
    },
  },
];
