'use client';
import React from 'react';
import {
  QueryTabs,
  Spinner,
  PerformanceCard,
  ProfileCard,
  InfiniteList,
} from '@/components/common';
import { useQueryParam } from '@/hooks';
import {
  favoritePerformancesOptions,
  favoriteUsersOptions,
} from '@/hooks/favoriteHooks';
import { GetFavoritePerformancesResponse } from '@/types/performance';
import { favoriteTabLabel } from '@/types/tabs';
import { GetFavoriteUsersResponse } from '@/types/users';

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
    <div className='flex flex-col'>
      <div className='sticky top-11 z-20 bg-white'>
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
            emptyFallback={
              <div className='col-span-2 py-8 text-center text-gray-500'>
                찜한 공연이 없습니다.
              </div>
            }
          />
        )}
        {selectedTab === favoriteTabLabel.USERS && (
          <InfiniteList<
            GetFavoriteUsersResponse,
            GetFavoriteUsersResponse['data'][number]
          >
            options={favoriteUsersOptions(DEFAULT_SIZE)}
            getDataId={(user) => user.id}
            renderData={(user) => (
              <ProfileCard profile={{ ...user, isMine: false }} />
            )}
            fallback={<SpinnerWrapper />}
            isFetchingFallback={<SpinnerWrapper />}
            className='mx-auto grid w-fit grid-cols-2 gap-4'
            emptyFallback={
              <div className='col-span-2 py-8 text-center text-gray-500'>
                찜한 사용자가 없습니다.
              </div>
            }
          />
        )}
      </div>
    </div>
  );
};

export default FavoriteTabContainer;
