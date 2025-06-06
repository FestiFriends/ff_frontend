'use client';
import { useState } from 'react';
import Tabs from '@/components/common/Tabs/Tabs';
import { Groups, Info } from '@/components/pages/performanceDetail';
import { PerformanceDetailResponse } from '@/types/performance';

interface PerformanceDetailTabsProps {
  performanceId: string;
  performanceDetail?: PerformanceDetailResponse;
  isPending: boolean;
}

const tabs: string[] = ['공연 정보', '모임'];

const PerformanceDetailTabs = ({
  performanceId,
  performanceDetail,
  isPending,
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
          <Info
            performanceDetail={performanceDetail?.data}
            isPending={isPending}
          />
        )}
        {selectedTab === '모임' && <Groups performanceId={performanceId} />}
      </div>
    </>
  );
};

export default PerformanceDetailTabs;
