'use client';

import React from 'react';
import { useGetTopFavoritesPerformances } from '@/hooks/performanceHooks/performanceHooks';
import PerformanceWrapper from './PerformanceWrapper';

const MainTopFavoritesPerformances = () => {
  const { data: topFavoritesPerformances, isPending } =
    useGetTopFavoritesPerformances();

  return (
    <PerformanceWrapper
      href=''
      title='지금 핫한 공연'
      isPending={isPending}
      performances={topFavoritesPerformances?.data}
    />
  );
};

export default MainTopFavoritesPerformances;
