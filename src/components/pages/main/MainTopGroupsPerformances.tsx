'use client';
import React from 'react';
import { useGetTopByGroupCountPerformances } from '@/hooks/performanceHooks/performanceHooks';
import PerformanceWrapper from './PerformanceWrapper';

const MainTopGroupsPerformances = () => {
  const { data: topByGroupCountPerformances, isPending } =
    useGetTopByGroupCountPerformances();

  return (
    <PerformanceWrapper
      href=''
      title='모임 많은 공연'
      isPending={isPending}
      performances={topByGroupCountPerformances?.data}
    />
  );
};

export default MainTopGroupsPerformances;
