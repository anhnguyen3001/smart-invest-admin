import { useState } from 'react';
import useSWR from 'swr';
import { domainApi } from '../utils/api';

const initialParams = {
  page: 1,
  pageSize: 10,
  sortBy: 'id',
  orderBy: 'DESC',
};

export const useDomains = () => {
  const [params, setParams] = useState(initialParams);

  const { data, error, mutate } = useSWR(JSON.stringify(params), async () => {
    return domainApi.getDomains(params);
  });

  const totalItems = data?.pagination?.totalItems;
  const totalPages = data?.pagination?.totalPages;
  const domains = data?.data?.domains;

  return {
    domains,
    loading: !data && !error,
    params,
    onChangeParams: setParams,
    totalItems,
    totalPages,
    mutateDomains: mutate,
  };
};
