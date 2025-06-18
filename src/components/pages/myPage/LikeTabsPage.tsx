'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Tabs } from '@/components/common';
import { TabLabel, TabLabelType } from '@/types/enums';
import FavoritePerformanceList from './FavoritePerformanceList';
import FavoriteUserList from './FavoriteUserList';

const tabList: TabLabelType[] = [TabLabel.USERS, TabLabel.PERFORMANCES];

const tabMap: Record<string, TabLabelType> = {
  users: TabLabel.USERS,
  performances: TabLabel.PERFORMANCES,
};

const reverseTabMap: Record<TabLabelType, string> = {
  [TabLabel.USERS]: 'users',
  [TabLabel.PERFORMANCES]: 'performances',
};

const LikeTabsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabQuery = searchParams.get('tab') ?? 'users';
  const initialTab = tabMap[tabQuery] ?? TabLabel.USERS;

  const [activeTab, setActiveTab] = useState<TabLabelType>(initialTab);

  const handleTabChange = (tab: string) => {
    if (!tabList.includes(tab as TabLabelType)) return;
    const typedTab = tab as TabLabelType;
    setActiveTab(typedTab);
    const queryValue = reverseTabMap[typedTab];
    router.replace(`/mypage/likes?tab=${queryValue}`);
  };

  useEffect(() => {
    const newTab = tabMap[tabQuery] ?? TabLabel.USERS;
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
        {activeTab === TabLabel.USERS && <FavoriteUserList />}
        {activeTab === TabLabel.PERFORMANCES && <FavoritePerformanceList />}
      </div>
    </main>
  );
};

export default LikeTabsPage;
