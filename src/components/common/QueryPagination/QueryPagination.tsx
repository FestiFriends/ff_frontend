'use client';

import React from 'react';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';
import Pagination from '../Pagination/Pagination';

interface QueryPaginationProps {
  totalPages: number;
  maxVisiblePages?: number;
  className?: string;
  pageParamKey?: string;
}

const QueryPagination = ({
  totalPages,
  maxVisiblePages = 5,
  className,
  pageParamKey = 'page',
}: QueryPaginationProps) => {
  const { getQueryParam, setQueryParam } = useQueryParam();
  const currentPage = parseInt(getQueryParam(pageParamKey) || '1', 10);

  const handlePageChange = (page: number) => {
    setQueryParam(pageParamKey, page.toString());
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      maxVisiblePages={maxVisiblePages}
      className={className}
    />
  );
};

export default QueryPagination;
