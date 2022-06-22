export const LOGIN = '/login';
export const REGISTER = '/register';

export const HOME = '/';

// IAM
export const USER_LIST = '/users';
export const PERMISSION_LIST = '/permissions';
export const ROUTE_LIST = '/routes';
export const ROLE_LIST = '/roles';

// Core
export const COMPANY_LIST = '/companies';

export const ADMIN = '/admin';
export const SETTING = ADMIN + '/account-settings';
export const DOMAINS = ADMIN + '/domains';

export const PAGE_LIST = ADMIN + '/pages';
export const PAGE_BUILDER = `${PAGE_LIST}/:id`;
export const PAGE_PREVIEW = `${PAGE_BUILDER}/preview`;

export const DOMAIN_LIST = ADMIN + '/domains';

export const TEMPLATE_LIST = ADMIN + '/templates';
export const TEMPLATE_BUILDER = `${TEMPLATE_LIST}/:id`;
export const TEMPLATE_PREVIEW = `/templates/:id/preview`;

export const TERMS = '/terms';
export const POLICY = '/policy';

export const TRACKING_SCREEN_MAPPING = {
  [HOME]: 'guestHome',
  [ADMIN]: 'adminHome',
  [SETTING]: 'settings',
  [PAGE_LIST]: 'pageList',
  [PAGE_BUILDER]: 'pageBuilder',
  [PAGE_PREVIEW]: 'pagePreview',
  [DOMAINS]: 'domains',
  [TEMPLATE_PREVIEW]: 'templatePreview',
  [LOGIN]: 'signIn',
  [REGISTER]: 'Register',
};

export const PAGE_TITLE_MAPPING = {
  [HOME]: 'Tempi - Tạo Landing Page hoàn toàn miễn phí chỉ trong ít phút',
  [ADMIN]: 'Trang chủ - Tempi',
  [SETTING]: 'Cài đặt - Tempi',
  [PAGE_LIST]: 'Trang của bạn - Tempi',
  [PAGE_BUILDER]: 'Trình kéo thả - Tempi',
  [PAGE_PREVIEW]: 'Xem trước trang - Tempi',
  [DOMAINS]: 'Tên miền - Tempi',
  [TEMPLATE_PREVIEW]: 'Xem trước trang mẫu - Tempi',
  [LOGIN]: 'Đăng nhập - Tempi',
  [REGISTER]: 'Đăng ký - Tempi',
};
