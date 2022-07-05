import useSWR from 'swr';
import { Role } from '../types';
import { roleApi } from '../utils/api';

export const useAllRoles = () => {
  const { data, error } = useSWR(
    `/permissions/get-all`,
    async () => {
      return roleApi.getAllRoles();
    },
    {
      revalidateOnFocus: false,
    },
  );

  return {
    roles: (data?.data?.roles || []) as Role[],
    loading: !data && !error,
  };
};
