'use client';

import React from 'react';
import { useGetTopFavoritesPerformances } from '@/hooks/performanceHooks/performanceHooks';
import PerformanceWrapper from './PerformanceWrapper';

const MainTopFavoritesPerformances = () => {
  const {
    data: topFavoritesPerformances,
    isPending,
    isError,
    error,
  } = useGetTopFavoritesPerformances();

  return (
    <PerformanceWrapper
      href='/performances?sort=popular'
      title='지금 핫한 공연'
      isPending={isPending}
      isError={isError}
      error={error}
      performances={topFavoritesPerformances?.data}
    />
  );
};

export default MainTopFavoritesPerformances;
