'use client';
import React from 'react';
import QueryPagination from '@/components/common/QueryPagination/QueryPagination';
import StateNotice from '@/components/common/StateNotice/StateNotice';
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
  const { getPerformanceQueryString } = useQueryParam();
  const queryString = getPerformanceQueryString();

  const {
    data: searchResult,
    error,
    isPending,
  } = useGetPerformances(queryString);

  if (error) return errorFallback(error);
  if (isPending) return <LoadingFallback />;
  if (!searchResult?.data)
    return (
      <div className='flex items-center justify-center py-8'>
        <span>데이터를 불러 올수 없습니다.</span>
      </div>
    );
  if (searchResult.data.length === 0)
    return <StateNotice preset='searchEmpty' />;

  const { totalPages = 0 } = searchResult;

  return (
    <>
      <PerformanceList performances={searchResult.data} />
      {totalPages > 1 && (
        <QueryPagination
          totalPages={totalPages}
          maxVisiblePages={5}
          className='mt-4'
        />
      )}
    </>
  );
};

export default PerformanceListContainer;
