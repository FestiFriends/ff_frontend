'use client';
import React from 'react';
import { getTopByGroupCountQueryOptions } from '@/hooks/performanceHooks/performanceHooks';
import PerformanceWrapper from './PerformanceWrapper';

const MainTopGroupsPerformances = () => (
  <PerformanceWrapper
    href='/performances?sort=group_count_desc&isExpired=false'
    title='모임 많은 공연'
    queryOptions={getTopByGroupCountQueryOptions()}
  />
);

export default MainTopGroupsPerformances;
