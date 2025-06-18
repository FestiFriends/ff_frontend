'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Tabs } from '@/components/common';
import { favoriteTabLabel, TabLabelType } from '@/types/tabs';
import FavoritePerformanceList from './FavoritePerformanceList';
import FavoriteUserList from './FavoriteUserList';

const tabList: TabLabelType[] = [
  favoriteTabLabel.USERS,
  favoriteTabLabel.PERFORMANCES,
];

const tabMap: Record<string, TabLabelType> = {
  users: favoriteTabLabel.USERS,
  performances: favoriteTabLabel.PERFORMANCES,
};

const reverseTabMap: Record<TabLabelType, string> = {
  [favoriteTabLabel.USERS]: 'users',
  [favoriteTabLabel.PERFORMANCES]: 'performances',
};

const LikeTabsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabQuery = searchParams.get('tab') ?? 'users';
  const initialTab = tabMap[tabQuery] ?? favoriteTabLabel.USERS;

  const [activeTab, setActiveTab] = useState<TabLabelType>(initialTab);

  const handleTabChange = (tab: string) => {
    if (!tabList.includes(tab as TabLabelType)) return;
    const typedTab = tab as TabLabelType;
    setActiveTab(typedTab);
    const queryValue = reverseTabMap[typedTab];
    router.replace(`/mypage/likes?tab=${queryValue}`);
  };

  useEffect(() => {
    const newTab = tabMap[tabQuery] ?? favoriteTabLabel.USERS;
    setActiveTab(newTab);
  }, [tabQuery]);

  return (
    <main className='flex flex-col items-center px-4 pt-4'>
      <Tabs
        tabs={tabList}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        className='w-full max-w-md'
      />

      <div className='mt-4 w-full max-w-md'>
        {activeTab === favoriteTabLabel.USERS && <FavoriteUserList />}
        {activeTab === favoriteTabLabel.PERFORMANCES && (
          <FavoritePerformanceList />
        )}
      </div>
    </main>
  );
};

export default LikeTabsPage;
