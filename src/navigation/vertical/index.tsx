import { Compass, Home, Key, UserCheck, Users } from 'react-feather';
import {
  ADMIN,
  PERMISSION_LIST,
  ROLE_LIST,
  ROUTE_LIST,
  USER_LIST,
} from 'router/path';
import { ACTION, RESOURCES } from 'router/permission';

const navigation = [
  {
    id: 'admin',
    title: 'Trang chủ',
    icon: <Home size={20} />,
    navLink: ADMIN,
    meta: {
      publicRoute: true,
    },
  },
  {
    id: 'userList',
    title: 'Người dùng',
    icon: <Users size={20} />,
    navLink: USER_LIST,
    meta: {
      publicRoute: false,
      permission: {
        resource: RESOURCES.USER,
        action: ACTION.READ,
      },
    },
  },
  {
    id: 'roleList',
    title: 'Vai trò',
    icon: <UserCheck size={20} />,
    navLink: ROLE_LIST,
    meta: {
      publicRoute: false,
      permission: {
        resource: RESOURCES.ROLE,
        action: ACTION.READ,
      },
    },
  },
  {
    id: 'permissionList',
    title: 'Quyền',
    icon: <Key size={20} />,
    navLink: PERMISSION_LIST,
    meta: {
      publicRoute: false,
      permission: {
        resource: RESOURCES.PERMISSION,
        action: ACTION.READ,
      },
    },
  },
  {
    id: 'routeList',
    title: 'Đường dẫn',
    icon: <Compass size={20} />,
    navLink: ROUTE_LIST,
    meta: {
      publicRoute: false,
      permission: {
        resource: RESOURCES.ROUTE,
        action: ACTION.READ,
      },
    },
  },
];

export const publicMenu = [
  // {
  //   id: 'instruction',
  //   title: 'Hướng dẫn',
  //   icon: <Book size={20} />,
  //   navLink: '/instruction',
  // },
  // {
  //   id: 'support',
  //   title: 'Hỗ trợ',
  //   icon: <Headphones size={20} />,
  //   navLink: '/support',
  // },
];

export default navigation;
