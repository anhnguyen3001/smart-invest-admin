import useSWR from 'swr';
import { blockApi } from '../utils/api';

export const useAllBlock = () => {
  const { data, mutate } = useSWR(
    '/blocks/get-all',
    async () => {
      return blockApi.getAllBlocks();
    },
    {
      revalidateOnFocus: false,
    },
  );
  const blocks = data?.data?.blocks || [];
  const categories = data?.data?.categories || [];

  return {
    blocks,
    categories,
    mutateAllBlock: mutate,
  };
};
