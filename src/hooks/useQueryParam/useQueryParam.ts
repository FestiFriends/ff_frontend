'use client';
import { useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const useQueryParam = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const setQueryParam = useCallback(
    (key: string, value: string | null) => {
      const newParams = new URLSearchParams(searchParams);
      if (value === null || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
      // 전체 URL 경로 포함해서 replace
      const fullURL = `${window.location.pathname}?${newParams.toString()}`;
      router.replace(fullURL);
    },
    [searchParams, router]
  );

  const setMultipleQueryParams = useCallback(
    (params: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams);
      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === '') {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });
      // 전체 URL 경로 포함해서 replace
      const fullURL = `${window.location.pathname}?${newParams.toString()}`;
      router.replace(fullURL);
    },
    [searchParams, router]
  );

  const getQueryParam = useCallback(
    (key: string) => searchParams.get(key),
    [searchParams]
  );

  const clearAllParams = useCallback(() => {
    // 전체 경로만 유지하고 쿼리 파라미터 모두 제거
    router.replace(window.location.pathname);
  }, [router]);

  return {
    getQueryParam,
    setQueryParam,
    setMultipleQueryParams,
    clearAllParams,
  };
};

export default useQueryParam;
