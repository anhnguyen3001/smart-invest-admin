import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import debounce from 'lodash.debounce';
import merchantApi from 'modules/merchant/utils/api';

const initialParams = {
  page: 1,
  pageSize: 20,
};

export const useMembers = () => {
  const [keyword, setKeyword] = useState('');
  const [params, setParams] = useState(initialParams);
  const [members, setMembers] = useState([]);

  const { data, error, mutate } = useSWR(JSON.stringify(params), async () => {
    return merchantApi.getUsers(params);
  });

  // eslint-disable-next-line
  const debounceSearch = useCallback(
    debounce(
      (nextValue) =>
        setParams((prev) => ({
          ...prev,
          searchQuery: nextValue ? nextValue : undefined,
        })),
      500,
    ),
    [],
  );

  const handleChangeKeyword = (val) => {
    setKeyword(val);
    debounceSearch(val);
  };

  useEffect(() => {
    if (data?.data?.users) setMembers(data?.data?.users);
  }, [data]);

  const totalItems = data?.pagination?.totalItems;
  const totalPages = data?.pagination?.totalPages;

  return {
    members,
    loading: !data && !error,
    keyword,
    onChangeKeyword: handleChangeKeyword,
    params,
    onChangeParams: setParams,
    totalItems,
    totalPages,
    mutateMembers: mutate,
  };
};
