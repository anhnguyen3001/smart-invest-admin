import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import pageApi from '../utils/api';
import debounce from 'lodash.debounce';

const initialParams = {
  page: 1,
  pageSize: 20,
  sortBy: 'id',
  orderBy: 'DESC',
};

export const usePages = () => {
  const [keyword, setKeyword] = useState('');
  const [params, setParams] = useState(initialParams);
  const [pages, setPages] = useState([]);

  const { data, error, mutate } = useSWR(JSON.stringify(params), async () => {
    return pageApi.getPages(params);
  });

  // eslint-disable-next-line
  const debounceSearch = useCallback(
    debounce(
      (nextValue) => setParams((prev) => ({ ...prev, q: nextValue })),
      500,
    ),
    [],
  );

  const handleChangeKeyword = (val) => {
    setKeyword(val);
    debounceSearch(val);
  };

  useEffect(() => {
    if (data?.data?.pages) setPages(data?.data?.pages);
  }, [data]);

  const totalItems = data?.pagination?.totalItems;
  const totalPages = data?.pagination?.totalPages;

  return {
    pages,
    loading: !data && !error,
    keyword,
    onChangeKeyword: handleChangeKeyword,
    params,
    onChangeParams: setParams,
    totalItems,
    totalPages,
    mutatePages: mutate,
  };
};
