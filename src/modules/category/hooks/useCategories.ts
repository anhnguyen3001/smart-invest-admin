import useSWR from 'swr';
import { categoryApi } from '../utils/api';

export const useAllCategories = () => {
  const { data, error } = useSWR(
    `/public/categories/get-all`,
    async () => {
      return categoryApi.getAllPublic();
    },
    {
      revalidateOnFocus: false,
    },
  );
  const loading = !data && !error;

  return {
    categories: data?.data?.categories || [],
    loading,
  };
};
