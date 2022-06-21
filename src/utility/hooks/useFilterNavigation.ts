import { useMemo } from 'react';
import { useAppSelector } from 'redux/store';
import { checkPermission } from '../Utils';

export const useFilterNavigation = (navigations) => {
  const user = useAppSelector((state) => state.auth.user);

  const fnCheckPermission = (nav) => {
    if (nav?.meta?.publicRoute !== false) return true;
    if (!nav?.meta?.permission) return !!user;
    const permissions = user?.permissions || [];
    return checkPermission(nav?.meta?.permission, permissions);
  };

  const filterNavigations = useMemo(() => {
    return navigations.filter((nav) => fnCheckPermission(nav));
    // eslint-disable-next-line
  }, [user, navigations]);

  return {
    filterNavigations,
  };
};
