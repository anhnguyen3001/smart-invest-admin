import debounce from 'lodash.debounce';
import { OrderBy } from 'types';
import { useCallback, useState } from 'react';
import useSWR from 'swr';
import { GetPermissionsParams, Permission } from '../types';
import { permissionApi } from '../utils/api';

const initialParams: GetPermissionsParams = {
  page: 1,
  pageSize: 10,
  sortBy: 'id',
  orderBy: OrderBy.DESC,
};

export const usePermissions = () => {
  const [params, setParams] = useState<GetPermissionsParams>(initialParams);

  const [loading, setLoading] = useState(false);

  const { data, error, mutate } = useSWR(
    ['/permissions', JSON.stringify(params)],
    () => {
      return permissionApi.getPermissions(params);
    },
    { revalidateOnFocus: false },
  );

  const debounceSearch = useCallback(() => {
    debounce(
      (nextValue) => setParams((prev) => ({ ...prev, q: nextValue })),
      500,
    );
  }, []);

  const { permissions, pagination } = data?.data || {};

  const onChangeParams = (params: GetPermissionsParams, isResetPage = true) => {
    setParams((prev) => ({
      ...prev,
      ...params,
      ...(isResetPage && { page: 1 }),
    }));
  };

  return {
    permissions: (permissions || []) as Permission[],
    loading: (!data && !error) || loading,
    onChangeKeyword: debounceSearch,
    setLoading,
    params,
    onChangeParams: onChangeParams,
    totalItems: pagination?.totalItems,
    totalPages: pagination?.totalPages,
    mutatePermissions: mutate,
  };
};
