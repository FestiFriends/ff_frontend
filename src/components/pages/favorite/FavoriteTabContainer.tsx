'use client';
import React from 'react';
import { LoadingOverlay, QueryTabs, Spinner } from '@/components/common';
import {
  FavoritePerformanceTabContent,
  FavoriteUserTabContent,
} from '@/components/pages/favorite';
import {
  useFavoritePerformances,
  useFavoriteUsers,
} from '@/hooks/favoriteHooks/useFavorite';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll/useInfiniteScroll';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';

const TABS = ['공연', '사용자'];

const DEFAULT_SIZE = 10;

const FavoriteTabContainer: React.FC = () => {
  const { getQueryParam } = useQueryParam();

  const currentTab = getQueryParam('tab') || TABS[0];
  const selectedTab = TABS.includes(currentTab) ? currentTab : TABS[0];

  const {
    data: performancesResponse,
    isLoading: isPerformancesLoading,
    hasNextPage: hasNextPerformances,
    fetchNextPage: fetchNextPerformances,
    isFetchingNextPage: isFetchingNextPerformances,
  } = useFavoritePerformances(DEFAULT_SIZE);

  const {
    data: usersResponse,
    isLoading: isUsersLoading,
    hasNextPage: hasNextUsers,
    fetchNextPage: fetchNextUsers,
    isFetchingNextPage: isFetchingNextUsers,
  } = useFavoriteUsers(DEFAULT_SIZE);

  const performancesBottomRef = useInfiniteScroll<HTMLDivElement>(
    fetchNextPerformances,

    hasNextPerformances ?? false
  );

  const usersBottomRef = useInfiniteScroll<HTMLDivElement>(
    fetchNextUsers,
    hasNextUsers ?? false
  );

  if (isPerformancesLoading || isUsersLoading) {
    return <LoadingOverlay />;
  }

  const performances =
    performancesResponse?.pages.flatMap((page) => page.data?.data ?? []) ?? [];
  const users =
    usersResponse?.pages.flatMap((page) => page.data?.data ?? []) ?? [];

  return (
    <>
      <QueryTabs
        tabs={TABS}
        defaultTab={TABS[0]}
        queryParamKey='tab'
      />
      <div className='p-4'>
        {selectedTab === '공연' && (
          <>
            <FavoritePerformanceTabContent performances={performances} />
            <div ref={performancesBottomRef} />
            {isFetchingNextPerformances && <Spinner />}
          </>
        )}
        {selectedTab === '사용자' && (
          <>
            <FavoriteUserTabContent users={users} />
            <div ref={usersBottomRef} />
            {isFetchingNextUsers && <Spinner />}
          </>
        )}
      </div>
    </>
  );
};

export default FavoriteTabContainer;
