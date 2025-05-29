'use client';

import { useSearchParams, useRouter } from 'next/navigation';

const useQueryParam = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const setQueryParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    router.replace(`?${newParams.toString()}`);
  };

  const getQueryParam = (key: string) => searchParams.get(key);

  return { getQueryParam, setQueryParam };
};

export default useQueryParam;
