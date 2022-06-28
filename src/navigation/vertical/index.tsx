import {
  Home,
  Key,
  Lock,
  Settings,
  Users,
  Book,
  Grid,
  Compass,
  UserCheck,
} from 'react-feather';
import {
  ADMIN,
  COMPANY_LIST,
  PERMISSION_LIST,
  ROLE_LIST,
  ROUTE_LIST,
  SETTING,
  USER_LIST,
} from 'router/path';

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
    id: 'iam',
    title: 'Quản lý người dùng',
    icon: <Lock size={20} />,
    meta: {
      publicRoute: true,
    },
    children: [
      {
        id: 'userList',
        title: 'Người dùng',
        icon: <Users size={20} />,
        navLink: USER_LIST,
        meta: {
          publicRoute: true,
        },
      },
      {
        id: 'roleList',
        title: 'Role',
        icon: <UserCheck size={20} />,
        navLink: ROLE_LIST,
        meta: {
          publicRoute: true,
        },
      },
      {
        id: 'permissionList',
        title: 'Quyền',
        icon: <Key size={20} />,
        navLink: PERMISSION_LIST,
        meta: {
          publicRoute: true,
        },
      },
      {
        id: 'routeList',
        title: 'Route',
        icon: <Compass size={20} />,
        navLink: ROUTE_LIST,
        meta: {
          publicRoute: true,
        },
      },
    ],
  },
  {
    id: 'core',
    title: 'Quản lý nội dung',
    icon: <Book size={20} />,
    meta: {
      publicRoute: true,
    },
    children: [
      {
        id: 'companyList',
        title: 'Công ty',
        icon: <Grid size={20} />,
        navLink: COMPANY_LIST,
        meta: {
          publicRoute: true,
        },
      },
    ],
  },
  {
    id: 'setting',
    title: 'Cài đặt',
    icon: <Settings size={20} />,
    navLink: SETTING,
    meta: {
      publicRoute: false,
      requiredOwnerMerchant: true,
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
