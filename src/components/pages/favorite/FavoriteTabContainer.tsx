'use client';

import React, { useState } from 'react';
import Tabs from '@/components/common/Tabs/Tabs';
import { useFavorite } from '@/hooks/favoriteHooks/useFavorite';
import { FavoritePerformanceTabContent } from './FavoritePerformanceTab';
import { FavoriteUserTabContent } from './FavoriteUserTab';

// 상수 정의
const TABS = ['공연', '사용자'];

const FavoriteTabContainer: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>(TABS[0]);
  const { favoritePerformances, favoriteUsers, isLoading } = useFavorite();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <Tabs
        tabs={TABS}
        activeTab={selectedTab}
        onTabChange={setSelectedTab}
      />
      <div className='p-4'>
        {selectedTab === '공연' && (
          <FavoritePerformanceTabContent performances={favoritePerformances} />
        )}
        {selectedTab === '사용자' && (
          <FavoriteUserTabContent users={favoriteUsers} />
        )}
      </div>
    </>
  );
};

export default FavoriteTabContainer;
