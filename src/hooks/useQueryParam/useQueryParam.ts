'use client';
import { useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const DEFAULT_PAGE = '1';
const DEFAULT_SIZE = '20';

type PerformanceQueryParams = {
  keyword?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  sort?: string;
  page?: string;
  size?: string;
};

const useQueryParam = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const getQueryParam = (key: string) => searchParams.get(key);

  const setQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.replace(`${window.location.pathname}?${params.toString()}`);
    return params.toString();
  };

  const getPerformanceQueryString = useCallback(
    (params: Partial<PerformanceQueryParams> = {}) => {
      const searchParams = new URLSearchParams();
      const queryParams = {
        keyword: getQueryParam('keyword'),
        category: getQueryParam('category'),
        startDate: getQueryParam('startDate'),
        endDate: getQueryParam('endDate'),
        location: getQueryParam('location'),
        sort: getQueryParam('sort'),
        page: getQueryParam('page') || DEFAULT_PAGE,
        size: getQueryParam('size') || DEFAULT_SIZE,
        ...params,
      };

      return Object.entries(queryParams)
        .filter(([, value]) => Boolean(value?.toString().trim()))
        .reduce((params, [key, value]) => {
          if (value) {
            params.set(key, value.toString());
          }
          return params;
        }, searchParams)
        .toString();
    },
    [searchParams]
  );

  const setMultipleQueryParams = useCallback(
    (params: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        newParams.set(key, value ?? '');
      });
      router.replace(`${window.location.pathname}?${newParams.toString()}`);
    },
    [router, searchParams]
  );

  const clearAllParams = useCallback(() => {
    router.replace(window.location.pathname);
  }, [router]);

  return {
    getQueryParam,
    setQueryParam,
    setMultipleQueryParams,
    clearAllParams,
    getPerformanceQueryString,
  };
};

export default useQueryParam;
