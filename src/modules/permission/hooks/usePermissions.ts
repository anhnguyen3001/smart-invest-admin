import debounce from 'lodash.debounce';
import { OrderBy } from 'modules/core/types';
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

const mockPermissions: Permission[] = [
  {
    id: 1,
    name: 'Xem Slug',
    code: 'slug:read',
  },
  {
    id: 2,
    name: 'Thêm Popup',
    code: 'popup:create',
  },
  {
    id: 1,
    name: 'Xem Popup',
    code: 'popup:read',
  },
];

export const usePermissions = () => {
  const [params, setParams] = useState<GetPermissionsParams>(initialParams);

  const [loading, setLoading] = useState(false);

  const { data, error, mutate } = useSWR(
    ['/permissions', JSON.stringify(params)],
    () => {
      return { data: { permissions: [], pagination: null } };
      // return permissionApi.getPermissions(params);
    },
  );

  const debounceSearch = useCallback(() => {
    debounce(
      (nextValue) => setParams((prev) => ({ ...prev, q: nextValue })),
      500,
    );
  }, []);

  const { permissions, pagination } = data?.data || {};

  const onChangeParams = (params: GetPermissionsParams) => {
    setParams((prev) => ({
      ...prev,
      ...params,
      ...(params?.page !== undefined && { page: 1 }),
    }));
  };

  return {
    permissions: mockPermissions as Permission[],
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
