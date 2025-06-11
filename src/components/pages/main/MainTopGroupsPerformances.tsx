'use client';
import React from 'react';
import { useGetTopByGroupCountPerformances } from '@/hooks/performanceHooks/performanceHooks';
import PerformanceWrapper from './PerformanceWrapper';

const MainTopGroupsPerformances = () => {
  const {
    data: topByGroupCountPerformances,
    isPending,
    isError,
    error,
  } = useGetTopByGroupCountPerformances();

  return (
    <PerformanceWrapper
      href='/performances'
      title='모임 많은 공연'
      isPending={isPending}
      isError={isError}
      error={error}
      performances={topByGroupCountPerformances}
    />
  );
};

export default MainTopGroupsPerformances;
