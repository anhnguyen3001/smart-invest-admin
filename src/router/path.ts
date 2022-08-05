export const LOGIN = '/login';
export const REGISTER = '/register';

export const NOT_FOUND = '/404';

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
