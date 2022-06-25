import debounce from 'lodash.debounce';
import { OrderBy } from 'modules/core/types';
import { useCallback, useState } from 'react';
import useSWR from 'swr';
import { GetUsersParams, LoginMethodEnum, User } from '../types';
import { userApi } from '../utils/api';

const initialParams: GetUsersParams = {
  page: 1,
  pageSize: 10,
  sortBy: 'id',
  orderBy: OrderBy.DESC,
};

const mockUsers: User[] = [
  {
    id: 1,
    email: 'nguyenhoanganh1@gmail.com',
    username: 'anhnguyen3001',
    isVerified: true,
    method: LoginMethodEnum.local,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    email: 'nguyenhoanganh2@gmail.com',
    username: 'anhnguyen3002',
    isVerified: false,
    method: LoginMethodEnum.local,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    email: 'nguyenhoanganh3@gmail.com',
    username: 'anhnguyen3003',
    isVerified: true,
    method: LoginMethodEnum.local,
    updatedAt: new Date().toISOString(),
  },
];

export const useUsers = () => {
  const [params, setParams] = useState<GetUsersParams>(initialParams);

  const [loading, setLoading] = useState(false);

  const { data, error, mutate } = useSWR(
    ['/users', JSON.stringify(params)],
    () => {
      return { data: { users: [], pagination: null } };
      // return userApi.getUsers(params);
    },
  );

  const debounceSearch = useCallback(() => {
    debounce(
      (nextValue) => setParams((prev) => ({ ...prev, q: nextValue })),
      500,
    );
  }, []);

  const { users, pagination } = data?.data || {};

  const onChangeParams = (params: GetUsersParams, isResetPage = true) => {
    setParams((prev) => ({
      ...prev,
      ...params,
      ...(isResetPage && { page: 1 }),
    }));
  };

  return {
    users: mockUsers as User[],
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
