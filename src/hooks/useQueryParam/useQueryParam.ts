'use client';
import { useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const DEFAULT_PAGE = '1';
const DEFAULT_SIZE = '20';

type PerformanceQueryParams = {
  title?: string;
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

  const setQueryParam = useCallback(
    (key: string, value: string, anchor?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      (() => (value ? params.set(key, value) : params.delete(key)))();
      router.replace(
        `${window.location.pathname}?${params.toString()}${anchor ? `#${anchor}` : ''}`
      );
    },
    [router, searchParams]
  );

  const getPerformanceQueryString = useCallback(
    (params: Partial<PerformanceQueryParams> = {}) => {
      const searchParams = new URLSearchParams();
      const queryParams = {
        title: getQueryParam('title'),
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
        if (value === null || value === '') {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
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
