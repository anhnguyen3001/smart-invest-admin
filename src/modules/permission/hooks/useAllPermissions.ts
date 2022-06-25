import useSWR from 'swr';
import { mockPermissions } from '../data';
import { Permission } from '../types';
import { permissionApi } from '../utils/api';

export const useAllPermissions = () => {
  const { data, error } = useSWR(
    `/permissions/get-all`,
    async () => {
      return {
        data: { permissions: mockPermissions },
      };
      return permissionApi.getAllPermissions();
    },
    {
      revalidateOnFocus: false,
    },
  );

  return {
    permisisons: (data?.data?.permissions || []) as Permission[],
    loading: !data && !error,
  };
};
