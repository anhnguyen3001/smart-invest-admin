import { useAppSelector } from 'redux/store';
import { AppPermisison } from 'types';
import { checkPermission } from 'utility/Utils';

export const useCheckPermission = (requiredPermission: AppPermisison) => {
  const user = useAppSelector((state) => state.auth.user);

  const checkIsAllowed = () => {
    return checkPermission(requiredPermission, user);
  };

  return { checkIsAllowed };
};
