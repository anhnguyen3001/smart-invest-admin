import { useAppSelector } from 'redux/store';
import { AppPermisison } from 'types';
import { checkPermission } from 'utility/Utils';

interface ComponentWithPermissionProps {
  permission: AppPermisison;
  children: React.ReactElement;
}

export const ComponentWithPermission: React.FC<
  ComponentWithPermissionProps
> = ({ permission, children }) => {
  const user = useAppSelector((state) => state.auth.user);
  console.log(permission, user);
  console.log(checkPermission(permission, user));
  if (!checkPermission(permission, user)) return null;
  return children;
};
