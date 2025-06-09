'use client';
import React, { useMemo, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import QueryPagination from '@/components/common/QueryPagination/QueryPagination';
import { PerformanceList } from '@/components/pages/performances';
import { useGetPerformances } from '@/hooks/performanceHooks/performanceHooks';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';

const LoadingFallback = () => (
  <div className='flex items-center justify-center py-8'>
    <span>로딩 중...</span>
  </div>
);

const errorFallback = (error: Error) => (
  <div className='flex items-center justify-center py-8'>
    <span className='text-red-500'>{error.message}</span>
  </div>
);

const PerformanceListContainer = () => {
  const { getQueryParam, setQueryParam } = useQueryParam();
  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    const validParams = {
      keyword: getQueryParam('keyword'),
      category: getQueryParam('category'),
      startDate: getQueryParam('startDate'),
      endDate: getQueryParam('endDate'),
      location: getQueryParam('location'),
      sort: getQueryParam('sort'),
      page: getQueryParam('page') || '1',
      size: getQueryParam('size') || '20',
    };

    Object.entries(validParams).forEach(([key, value]) => {
      if (value && value.toString().trim()) {
        params.set(key, value.toString());
      }
    });

    return params.toString();
  }, [getQueryParam]);

  const {
    data: searchResult,
    error,
  } = useQuery<PerformancesResponsePagination>({
    queryKey: ['performances', queryString],
    queryFn: () =>
      nextFetcher<PerformancesResponsePagination>(
        `/api/v1/performances?${queryString}`,
        { method: 'GET', revalidate: 21600 }
      ),
  });

  return { searchResult, isLoading, error, setQueryParam, getQueryParam };
};

const LoadingFallback = () => (
  <div className='flex items-center justify-center py-8'>
    <span>로딩 중...</span>
  </div>
);

const errorFallback = (error: Error) => (
  <div className='flex items-center justify-center py-8'>
    <span className='text-red-500'>{error.message}</span>
  </div>
);

const PerformanceListContainer = () => {
  const { searchResult, error, getQueryParam } = usePerformanceQuery();

  if (error) return errorFallback(error);

  if (isPending) return <LoadingFallback />;

  if (!searchResult || !searchResult.data)
    return (
      <div>
        <span>데이터를 불러 올수 없습니다.</span>
      </div>
    );

  const totalPages = searchResult?.totalPages || 0;
  const totalItems = searchResult?.totalElements || 0;
  const currentPage = parseInt(getQueryParam('page') || '1', 10);

  return (
    <div>
      <div className='mb-4 text-sm text-gray-600'>
        총 {totalItems}개의 공연이 있습니다. (페이지 {currentPage} /{' '}
        {totalPages})
      </div>
      <PerformanceList performances={searchResult.data} />
      {totalPages > 1 && (
        <QueryPagination
          totalPages={totalPages}
          maxVisiblePages={5}
          className='mt-4'
        />
      )}
    </div>
  );
};

export default PerformanceListContainer;
