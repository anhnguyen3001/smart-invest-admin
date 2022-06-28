import debounce from 'lodash.debounce';
import { OrderBy } from 'modules/core/types';
import { useCallback, useState } from 'react';
import useSWR from 'swr';
import { GetRoutesParams, MethodEnum, Route } from '../types';
import { routeApi } from '../utils/api';

const initialParams: GetRoutesParams = {
  page: 1,
  pageSize: 10,
  sortBy: 'id',
  orderBy: OrderBy.DESC,
};

const mockRoutes: Route[] = [
  {
    id: 1,
    name: '/v1/popups/{}',
    regUri: '/v1/popups/[0-9]+',
    method: MethodEnum.post,
  },
  {
    id: 2,
    name: '/v1/popups/{}',
    regUri: '/v1/popups/[0-9]+',
    method: MethodEnum.get,
  },
];

export const useRoutes = () => {
  const [params, setParams] = useState<GetRoutesParams>(initialParams);

  const [loading, setLoading] = useState(false);

  const { data, error, mutate } = useSWR(
    ['/routes', JSON.stringify(params)],
    () => {
      return { data: { routes: mockRoutes, pagination: null } };
      // return routeApi.getRoutes(params);
    },
  );

  const debounceSearch = useCallback(() => {
    debounce(
      (nextValue) => setParams((prev) => ({ ...prev, q: nextValue, page: 1 })),
      500,
    );
  }, []);

  const { routes, pagination } = data?.data || {};

  const onChangeParams = (params: GetRoutesParams, isResetPage = true) => {
    setParams((prev) => ({
      ...prev,
      ...params,
      ...(isResetPage && { page: 1 }),
    }));
  };

  return {
    routes: (routes || []) as Route[],
    loading: (!data && !error) || loading,
    onChangeKeyword: debounceSearch,
    setLoading,
    params,
    onChangeParams: onChangeParams,
    totalItems: pagination?.totalItems,
    totalPages: pagination?.totalPages,
    mutateRoutes: mutate,
  };
};
