import { Home, Layers, Settings, User } from 'react-feather';
import { ADMIN, SETTING, TEMPLATE_LIST, USER_LIST } from 'router/path';
import { ACTION, APP, RESOURCES } from 'router/permission';

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
    title: 'Danh sách người dùng',
    icon: <User size={20} />,
    navLink: USER_LIST,
    meta: {
      publicRoute: true,
    },
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
  {
    id: 'templateList',
    title: 'Trang mẫu',
    icon: <Layers size={20} />,
    meta: {
      publicRoute: false,
      permission: {
        app: APP.BUILDER_BFF,
        resource: RESOURCES.TEMPLATE,
        action: ACTION.READ_UI,
      },
    },
    children: [
      {
        id: 'templateList',
        title: 'Danh sách trang mẫu',
        navLink: TEMPLATE_LIST,
        meta: {
          publicRoute: false,
          permission: {
            app: APP.BUILDER_BFF,
            resource: RESOURCES.TEMPLATE,
            action: ACTION.READ,
          },
        },
      },
      {
        id: 'category_templateList',
        title: 'Danh mục',
        navLink: '/template-categories',
        meta: {
          publicRoute: false,
          permission: {
            app: APP.BUILDER_BFF,
            resource: RESOURCES.CATEGORY,
            action: ACTION.READ,
          },
        },
      },
    ],
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
