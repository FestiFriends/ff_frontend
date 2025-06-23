'use client';
import React from 'react';
import {
  QueryTabs,
  Spinner,
  PerformanceCard,
  InfiniteList,
} from '@/components/common';
import StateNotice from '@/components/common/StateNotice/StateNotice';
import { useQueryParam } from '@/hooks';
import {
  favoritePerformancesOptions,
  favoriteUsersOptions,
} from '@/hooks/favoriteHooks';
import { GetFavoritePerformancesResponse } from '@/types/performance';
import { favoriteTabLabel } from '@/types/tabs';
import { GetFavoriteUsersResponse } from '@/types/users';
import FavoriteUserCard from './FavoriteUserCard';

const TABS = Object.values(favoriteTabLabel);

const DEFAULT_SIZE = 10;

const FavoriteTabContainer: React.FC = () => {
  const { getQueryParam } = useQueryParam();

  const currentTab = getQueryParam('tab') || TABS[0];
  const selectedTab = TABS.includes(currentTab as (typeof TABS)[number])
    ? (currentTab as (typeof TABS)[number])
    : TABS[0];

  const SpinnerWrapper = () => (
    <div className='flex min-h-96 w-full items-center justify-center'>
      <Spinner />
    </div>
  );

  return (
    <>
      <div className='sticky top-0 z-20 bg-white'>
        <QueryTabs
          tabs={TABS}
          defaultTab={TABS[0]}
          queryParamKey='tab'
        />
      </div>
      <div className='flex-1 p-4'>
        {selectedTab === favoriteTabLabel.PERFORMANCES && (
          <InfiniteList<
            GetFavoritePerformancesResponse,
            GetFavoritePerformancesResponse['data'][number]
          >
            options={favoritePerformancesOptions(DEFAULT_SIZE)}
            getDataId={(performance) => performance.id}
            renderData={(performance) => (
              <PerformanceCard
                performance={performance}
                size='auto'
                type='listItem'
              />
            )}
            fallback={<SpinnerWrapper />}
            isFetchingFallback={<SpinnerWrapper />}
            className='mx-auto flex flex-col gap-4'
            emptyFallback={<StateNotice preset='likedPerformancesEmpty' />}
          />
        )}
        {selectedTab === favoriteTabLabel.USERS && (
          <InfiniteList<
            GetFavoriteUsersResponse,
            GetFavoriteUsersResponse['data'][number]
          >
            options={favoriteUsersOptions(DEFAULT_SIZE)}
            getDataId={(user) => user.userUid}
            renderData={(user) => <FavoriteUserCard {...user} />}
            fallback={<Spinner />}
            isFetchingFallback={<Spinner />}
            className='flex flex-col gap-5'
            emptyFallback={<StateNotice preset='likedUsersEmpty' />}
          />
        )}
      </div>
    </>
  );
};

export default FavoriteTabContainer;
