'use client';
import React from 'react';
import { QueryTabs, Spinner } from '@/components/common';
import InfiniteList from '@/components/common/InfiniteList/InfiniteList ';
import PerformanceCard from '@/components/common/PerformanceCard';
import ProfileCard from '@/components/common/ProfileCard/ProfileCard';
import {
  favoritePerformancesOptions,
  favoriteUsersOptions,
} from '@/hooks/favoriteHooks/useFavorite';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';
import { GetFavoritePerformancesResponse } from '@/types/performance';
import { GetFavoriteUsersResponse } from '@/types/users';

const TABS = ['공연', '사용자'];

const DEFAULT_SIZE = 10;

const FavoriteTabContainer: React.FC = () => {
  const { getQueryParam } = useQueryParam();

  const currentTab = getQueryParam('tab') || TABS[0];
  const selectedTab = TABS.includes(currentTab) ? currentTab : TABS[0];

  return (
    <>
      <QueryTabs
        tabs={TABS}
        defaultTab={TABS[0]}
        queryParamKey='tab'
      />
      <div className='p-4'>
        {selectedTab === '공연' && (
          <InfiniteList<
            GetFavoritePerformancesResponse,
            GetFavoritePerformancesResponse['data'][number]
          >
            options={favoritePerformancesOptions(DEFAULT_SIZE)}
            getDataId={(performance) => performance.id}
            renderData={(performance) => (
              <PerformanceCard performance={performance} />
            )}
            fallback={<Spinner />}
            isFetchingFallback={<Spinner />}
            className='mx-auto grid w-fit grid-cols-2 gap-4'
            emptyFallback={
              <div className='col-span-2 py-8 text-center text-gray-500'>
                찜한 공연이 없습니다.
              </div>
            }
          />
        )}
        {selectedTab === '사용자' && (
          <InfiniteList<
            GetFavoriteUsersResponse,
            GetFavoriteUsersResponse['data'][number]
          >
            options={favoriteUsersOptions(DEFAULT_SIZE)}
            getDataId={(user) => user.id}
            renderData={(user) => (
              <ProfileCard profile={{ ...user, isMine: false }} />
            )}
            fallback={<Spinner />}
            isFetchingFallback={<Spinner />}
            className='mx-auto grid w-fit grid-cols-2 gap-4'
            emptyFallback={
              <div className='col-span-2 py-8 text-center text-gray-500'>
                찜한 사용자가 없습니다.
              </div>
            }
          />
        )}
      </div>
    </>
  );
};

export default FavoriteTabContainer;
