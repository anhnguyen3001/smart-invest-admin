import { LAYOUT } from 'configs/constants';
import { lazy } from 'react';
import { HOME, LOGIN, REGISTER } from 'router/path';
import AdminHome from '../../modules/home/views/AdminHome';
import { SETTING } from '../path';
import { UserRoutes } from './user';

const DefaultRoute = '/';

const Login = lazy(() => import('../../modules/auth/views/Login'));
const Register = lazy(() => import('../../modules/auth/views/Register'));

const Error = lazy(() => import('../../views/Error'));
const AccountSettings = lazy(
  () => import('../../modules/setting/views/AccountSetting'),
);

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
  {
    path: SETTING,
    contentType: 'other',
    component: <AccountSettings />,
  },
  ...UserRoutes,
];

export { DefaultRoute, Routes };
