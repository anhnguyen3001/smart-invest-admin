import { LAYOUT } from 'configs/constants';
import { lazy } from 'react';
import { HOME, LOGIN, REGISTER } from 'router/path';
import AdminHome from '../../modules/home/views/AdminHome';
import { PermissionRoutes } from './permission';
import { RoleRoutes } from './role';
import { UserRoutes } from './user';

const DefaultRoute = '/';

const Login = lazy(() => import('../../modules/auth/views/Login'));
const Register = lazy(() => import('../../modules/auth/views/Register'));

const Error = lazy(() => import('../../views/Error'));

// ** Merge Routes
const Routes = [
  {
    path: LOGIN,
    component: <Login />,
    meta: {
      publicRoute: true,
      layout: LAYOUT.blank,
    },
  },
  {
    path: REGISTER,
    component: <Register />,
    meta: {
      publicRoute: true,
      layout: LAYOUT.blank,
    },
  },
  {
    path: HOME,
    component: <AdminHome />,
    meta: {
      publicRoute: true,
    },
  },
  {
    path: '/error',
    component: <Error />,
    meta: {
      layout: LAYOUT.blank,
    },
  },
  ...UserRoutes,
  ...PermissionRoutes,
  ...RoleRoutes,
];

export { DefaultRoute, Routes };
