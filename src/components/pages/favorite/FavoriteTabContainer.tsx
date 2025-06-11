'use client';
import React from 'react';
import { QueryTabs } from '@/components/common';
import {
  FavoritePerformanceTabContent,
  FavoriteUserTabContent,
} from '@/components/pages/favorite';
import {
  useFavoritePerformances,
  useFavoriteUsers,
} from '@/hooks/favoriteHooks/useFavorite';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';

const TABS = ['공연', '사용자'];

const FavoriteTabContainer: React.FC = () => {
  const { getQueryParam } = useQueryParam();

  const currentTab = getQueryParam('tab') || TABS[0];
  const selectedTab = TABS.includes(currentTab) ? currentTab : TABS[0];

  const { data: performancesResponse, isLoading: isPerformancesLoading } =
    useFavoritePerformances();
  const { data: usersResponse, isLoading: isUsersLoading } = useFavoriteUsers();

  if (isPerformancesLoading || isUsersLoading) {
    return <div>로딩 중...</div>;
  }

  const performances = performancesResponse?.data?.data ?? [];
  const users = usersResponse?.data?.data ?? [];

  return (
    <>
      <QueryTabs
        tabs={TABS}
        defaultTab={TABS[0]}
        queryParamKey='tab'
      />
      <div className='p-4'>
        {selectedTab === '공연' && (
          <FavoritePerformanceTabContent performances={performances} />
        )}
        {selectedTab === '사용자' && <FavoriteUserTabContent users={users} />}
      </div>
    </>
  );
};

export default FavoriteTabContainer;
