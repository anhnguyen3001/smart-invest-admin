import { useInitMerchant } from 'modules/merchant/hooks/useInitMerchant';
import { useAppSelector } from 'redux/store';
import { useMemo } from 'react';
import { checkPermission } from '../Utils';

export const useFilterNavigation = (navigations) => {
  const authState = useAppSelector((state) => state.auth);
  const { currentMerchant } = useInitMerchant();
  const user = authState?.user;

  const fnCheckPermission = (nav) => {
    if (nav?.meta?.publicRoute !== false) return true;
    if (!nav?.meta?.permission) return !!user;
    const permissions = user?.permissions || [];
    return checkPermission(nav?.meta?.permission, permissions);
  };

  const filterNavigations = useMemo(() => {
    return navigations.filter((nav) => {
      const checkOwnerMerchant =
        !nav?.meta?.requiredOwnerMerchant ||
        (nav?.meta?.requiredOwnerMerchant && currentMerchant?.isOwned);
      const checkPermission = fnCheckPermission(nav);
      return checkOwnerMerchant && checkPermission;
    });
    // eslint-disable-next-line
  }, [user, currentMerchant, navigations]);

  return {
    filterNavigations,
  };
};
