import debounce from 'lodash.debounce';
import { OrderBy } from 'modules/core/types';
import { useCallback, useState } from 'react';
import useSWR from 'swr';
import { GetUsersParams, User } from '../types';
import { userApi } from '../utils/api';

const initialParams: GetUsersParams = {
  page: 1,
  pageSize: 10,
  sortBy: 'id',
  orderBy: OrderBy.DESC,
};

export const useUsers = () => {
  const [params, setParams] = useState<GetUsersParams>(initialParams);

  const [loading, setLoading] = useState(false);

  const { data, error, mutate } = useSWR(
    `/users?${JSON.stringify(params)}`,
    () => {
      return userApi.getUsers({
        ...params,
        q: params?.q || undefined,
        isVerified: params.isVerified || undefined,
      });
    },
    { revalidateOnFocus: false },
  );

  // eslint-disable-next-line
  const debounceSearch = useCallback(
    debounce((nextValue) => {
      setParams((prev) => ({ ...prev, q: nextValue }));
    }, 500),
    [],
  );

  const { users, pagination } = data?.data || {};

  const onChangeParams = (params: GetUsersParams, isResetPage = true) => {
    setParams((prev) => ({
      ...prev,
      ...params,
      ...(isResetPage && { page: 1 }),
    }));
  };

  return {
    users: users as User[],
    loading: (!data && !error) || loading,
    onChangeKeyword: debounceSearch,
    setLoading,
    params,
    onChangeParams: onChangeParams,
    totalItems: pagination?.totalItems,
    totalPages: pagination?.totalPages,
    mutateUsers: mutate,
  };
};
