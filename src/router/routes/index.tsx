import { LAYOUT } from 'configs/constants';
import { lazy } from 'react';
import { HOME, LOGIN, NOT_FOUND, REGISTER } from 'router/path';
import AdminHome from '../../modules/home/views/AdminHome';
import { PermissionRoutes } from './permission';
import { RoleRoutes } from './role';
import { RouteRoutes } from './route';
import { UserRoutes } from './user';

const DefaultRoute = '/';

const Login = lazy(() => import('../../modules/auth/views/Login'));
const Register = lazy(() => import('../../modules/auth/views/Register'));

const NotFound = lazy(() => import('../../modules/core/views/404'));

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
      publicRoute: false,
    },
  },
  {
    path: '/error',
    component: <Error />,
    meta: {
      layout: LAYOUT.blank,
    },
  },
  {
    path: NOT_FOUND,
    component: <NotFound />,
    meta: {
      layout: LAYOUT.blank,
    },
  },
  ...UserRoutes,
  ...PermissionRoutes,
  ...RoleRoutes,
  ...RouteRoutes,
];

export { DefaultRoute, Routes };
