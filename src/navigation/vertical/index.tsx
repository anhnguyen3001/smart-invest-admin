import { ADMIN, PAGE_LIST, SETTING, TEMPLATE_LIST, DOMAINS } from 'router/path';
import { ACTION, APP, RESOURCES } from 'router/permission';
import {
  Home,
  Layout,
  Layers,
  Grid,
  Copy,
  Settings,
  Globe,
} from 'react-feather';

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
    id: 'pageList',
    title: 'Trang của bạn',
    icon: <Layout size={20} />,
    navLink: PAGE_LIST,
    meta: {
      publicRoute: false,
    },
  },
  {
    id: 'domainList',
    title: 'Tên miền của bạn',
    icon: <Globe size={20} />,
    navLink: DOMAINS,
    meta: {
      publicRoute: false,
      requiredOwnerMerchant: true,
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
  {
    id: 'blockList',
    title: 'Block',
    icon: <Grid size={20} />,
    meta: {
      publicRoute: false,
      permission: {
        app: APP.BUILDER_BFF,
        resource: RESOURCES.BLOCK,
        action: ACTION.READ_UI,
      },
    },
    children: [
      {
        id: 'blockList',
        title: 'Danh sách block',
        navLink: '/blocks',
        meta: {
          publicRoute: false,
          permission: {
            app: APP.BUILDER_BFF,
            resource: RESOURCES.BLOCK,
            action: ACTION.READ,
          },
        },
      },
      {
        id: 'category_blockList',
        title: 'Danh mục',
        navLink: '/block-categories',
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
  {
    id: 'popupList',
    title: 'Popup',
    icon: <Copy size={20} />,
    meta: {
      publicRoute: false,
      permission: {
        app: APP.BUILDER_BFF,
        resource: RESOURCES.POPUP,
        action: ACTION.READ_UI,
      },
    },
    children: [
      {
        id: 'popupList',
        title: 'Danh sách popup',
        navLink: '/popups',
        meta: {
          publicRoute: false,
          permission: {
            app: APP.BUILDER_BFF,
            resource: RESOURCES.POPUP,
            action: ACTION.READ,
          },
        },
      },
      {
        id: 'category_popupList',
        title: 'Danh mục',
        navLink: '/popup-categories',
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
