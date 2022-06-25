import debounce from 'lodash.debounce';
import { OrderBy } from 'modules/core/types';
import { useCallback, useState } from 'react';
import useSWR from 'swr';
import { GetRolesParams, Role } from '../types';
import { roleApi } from '../utils/api';

const initialParams: GetRolesParams = {
  page: 1,
  pageSize: 10,
  sortBy: 'id',
  orderBy: OrderBy.DESC,
};

const mockRoles: Role[] = [
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

export const useRoles = () => {
  const [params, setParams] = useState<GetRolesParams>(initialParams);

  const [loading, setLoading] = useState(false);

  const { data, error, mutate } = useSWR(
    ['/roles', JSON.stringify(params)],
    () => {
      return { data: { roles: [], pagination: null } };
      // return roleApi.getRoles(params);
    },
  );

  const debounceSearch = useCallback(() => {
    debounce(
      (nextValue) => setParams((prev) => ({ ...prev, q: nextValue, page: 1 })),
      500,
    );
  }, []);

  const { roles, pagination } = data?.data || {};

  const onChangeParams = (params: GetRolesParams, isResetPage = true) => {
    setParams((prev) => ({
      ...prev,
      ...params,
      ...(isResetPage && { page: 1 }),
    }));
  };

  return {
    roles: mockRoles as Role[],
    loading: (!data && !error) || loading,
    onChangeKeyword: debounceSearch,
    setLoading,
    params,
    onChangeParams: onChangeParams,
    totalItems: pagination?.totalItems,
    totalPages: pagination?.totalPages,
    mutateRoles: mutate,
  };
};
