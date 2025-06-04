import React from 'react';
import { nextFetcher } from '@/lib/nextFetcher';
import { PerformancesResponse } from '@/types/performance';
import PerformanceWrapper from './PerformanceWrapper';

const MainTopGroupsPerformances = async () => {
  const topFavoritesPerformances = await nextFetcher<PerformancesResponse>(
    `/api/v1/performances/top-groups`,
    { method: 'GET', revalidate: 21600 }
  );
  return (
    <PerformanceWrapper
      href=''
      title='모임 많은 공연'
      performances={topFavoritesPerformances}
    />
  );
};

export default MainTopGroupsPerformances;
