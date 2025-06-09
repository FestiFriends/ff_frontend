'use client';
import { useState } from 'react';
import Tabs from '@/components/common/Tabs/Tabs';
import { Groups, Info } from '@/components/pages/performanceDetail';
import { Performance } from '@/types/performance';

interface PerformanceDetailTabsProps {
  isPending: boolean;
  performanceDetail?: Performance;
}

const tabs: string[] = ['공연 정보', '모임'];

const PerformanceDetailTabs = ({
  isPending,
  performanceDetail,
}: PerformanceDetailTabsProps) => {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);

  return (
    <div className='flex flex-col gap-5 bg-white'>
      <Tabs
        tabs={tabs}
        activeTab={selectedTab}
        onTabChange={setSelectedTab}
      />
      <>
        {selectedTab === '공연 정보' && (
          <Info
            isPending={isPending}
            performanceDetail={performanceDetail}
          />
        )}
        {selectedTab === '모임' && <Groups />}
      </>
    </div>
  );
};

export default PerformanceDetailTabs;
