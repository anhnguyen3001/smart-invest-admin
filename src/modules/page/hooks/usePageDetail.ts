import { useState } from 'react';
import pageApi from '../utils/api';
import useSWR from 'swr';

export const usePageDetail = (id, queryParams) => {
  const [loading, setLoading] = useState(false);

  const { data, error, mutate } = useSWR(
    id ? ['/page', id, JSON.stringify(queryParams)] : null,
    async (_) => {
      return pageApi.getPage(id, queryParams);
    },
    {
      revalidateOnFocus: false,
    },
  );

  return {
    result: data?.data?.page,
    loading: (!data && !error) || loading,
    setLoading,
    mutatePage: mutate,
  };
};
