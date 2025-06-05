'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { PerformanceList } from '@/components/pages/performances';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';
import { nextFetcher } from '@/lib/nextFetcher';
import { PerformancesResponsePagination } from '@/types/performance';

// api를 불러와서 데이터만 주입하는 컴포넌트
// PerformancesListContainer =|Performance[]|=> PerformanceList =|Performance|=> PerformancesPerformanceCard

const PerformanceListContainer = () => {
  const { getQueryParam } = useQueryParam();
  const [searchResult, setSearchResult] =
    useState<PerformancesResponsePagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await nextFetcher<PerformancesResponsePagination>(
          `/api/v1/performances?${queryString}`,
          { method: 'GET', revalidate: 21600 }
        );
        setSearchResult(result);
      } catch (error) {
        if (error && typeof error === 'object' && 'message' in error) {
          setError((error as { message: string }).message);
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('데이터를 불러올 수 없습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [queryString]);

  console.log('loading', loading);
  console.log('error', error);

  const Fallback = (
    <div>
      <span>데이터를 불러 올수 없습니다.</span>
    </div>
  );

  if (!searchResult || !searchResult.data) return Fallback;

  return <PerformanceList performances={searchResult.data} />;
};

export default PerformanceListContainer;
