'use client';
import React, { useMemo } from 'react';
import QueryPagination from '@/components/common/QueryPagination/QueryPagination';
import { PerformanceList } from '@/components/pages/performances';
import { useGetPerformances } from '@/hooks/performanceHooks/performanceHooks';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';

const DEFAULT_PAGE = '1';
const DEFAULT_SIZE = '20';

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
  const { getQueryParam } = useQueryParam();

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    const queryParams = {
      keyword: getQueryParam('keyword'),
      category: getQueryParam('category'),
      startDate: getQueryParam('startDate'),
      endDate: getQueryParam('endDate'),
      location: getQueryParam('location'),
      sort: getQueryParam('sort'),
      page: getQueryParam('page') || DEFAULT_PAGE,
      size: getQueryParam('size') || DEFAULT_SIZE,
    };

    return Object.entries(queryParams)
      .filter(([, value]) => Boolean(value?.toString().trim()))
      .reduce((params, [key, value]) => {
        if (value) {
          params.set(key, value.toString());
        }
        return params;
      }, params)
      .toString();
  }, [getQueryParam]);

  const {
    data: searchResult,
    error,
    isPending,
  } = useGetPerformances(queryString);

  if (error) return errorFallback(error);

  if (isPending) return <LoadingFallback />;

  if (!searchResult?.data)
    return (
      <div>
        <span>데이터를 불러 올수 없습니다.</span>
      </div>
    );

  const { totalPages = 0, totalElements: totalItems = 0 } = searchResult;
  const currentPage = parseInt(getQueryParam('page') || DEFAULT_PAGE, 10);

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
