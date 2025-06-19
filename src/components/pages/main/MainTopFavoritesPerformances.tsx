'use client';

import React from 'react';
import { getTopFavoritesQueryOptions } from '@/hooks/performanceHooks/performanceHooks';
import PerformanceWrapper from './PerformanceWrapper';

const MainTopFavoritesPerformances = () => (
  <PerformanceWrapper
    title='지금 핫한 공연'
    href='/performances?sort=favorite_count_desc&isExpired=false'
    queryOptions={getTopFavoritesQueryOptions()}
  />
);

export default MainTopFavoritesPerformances;
