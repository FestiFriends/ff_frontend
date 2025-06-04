import React from 'react';
import { nextFetcher } from '@/lib/nextFetcher';
import { PerformancesResponse } from '@/types/performance';
import PerformanceWrapper from './PerformanceWrapper';

const MainTopFavoritesPerformances = async () => {
  const topFavoritesPerformances = await nextFetcher<PerformancesResponse>(
    `/api/v1/performances/top-favorites`,
    { method: 'GET', revalidate: 21600 }
  );

  return (
    <PerformanceWrapper
      href=''
      title='지금 핫한 공연'
      performances={topFavoritesPerformances}
    />
  );
};

export default MainTopFavoritesPerformances;
