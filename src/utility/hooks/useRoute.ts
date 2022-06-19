import {
  ADMIN,
  DOMAIN_LIST,
  HOME,
  PAGE_BUILDER,
  PAGE_LIST,
  SETTING,
} from 'router/path';
import { useLocation, matchPath } from 'react-router-dom';

export const useRoute = () => {
  const location = useLocation();

  const isPageRequireInitIAM = ![HOME, ADMIN].includes(location.pathname);

  const isPageRequireMerchant = [
    PAGE_LIST,
    PAGE_BUILDER,
    SETTING,
    DOMAIN_LIST,
    ADMIN,
  ].some(
    (p) =>
      !!matchPath(location.pathname, {
        path: p,
        exact: true,
        strict: false,
      }),
  );

  return {
    isPageRequireInitIAM,
    isPageRequireMerchant,
  };
};
