'use client';
import { useState } from 'react';
import Tabs from '@/components/common/Tabs/Tabs';
import { Groups, Info } from '@/components/pages/performanceDetail';
import { Performance } from '@/types/performance';

interface PerformanceDetailTabsProps {
  performanceDetail: Performance;
}

const tabs: string[] = ['공연 정보', '모임'];

const PerformanceDetailTabs = ({
  performanceDetail,
}: PerformanceDetailTabsProps) => {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);

  return (
    <>
      <Tabs
        tabs={tabs}
        activeTab={selectedTab}
        onTabChange={setSelectedTab}
      />
      <div>
        {selectedTab === '공연 정보' && (
          <Info performanceDetail={performanceDetail} />
        )}
        {selectedTab === '모임' && (
          <Groups performanceDetail={performanceDetail} />
        )}
      </div>
    </>
  );
};

export default PerformanceDetailTabs;
