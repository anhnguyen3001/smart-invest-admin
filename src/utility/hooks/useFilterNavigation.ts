import { useMemo } from 'react';
import { useAppSelector } from 'redux/store';
import { checkPermission } from '../Utils';

export const useFilterNavigation = (navigations) => {
  const user = useAppSelector((state) => state.auth.user);

  const filterNavigations = useMemo(() => {
    return navigations.filter((nav) => {
      if (nav.meta.publicRoute !== false) return true;
      return checkPermission(nav.meta.permission, user);
    });
    // eslint-disable-next-line
  }, [user, navigations]);

  return {
    filterNavigations,
  };
};
