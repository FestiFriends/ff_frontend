'use client';

import { useState } from 'react';
import Tabs from '@/components/common/Tabs/Tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import WritableReviews from './WritableReviews';
import WrittenReviews from './WrittenReviews';

const tabs = ['작성 가능한 리뷰', '작성한 리뷰'];

const ReviewTabs = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  return (
    <div className='h-[calc(100dvh-44px)]'>
      <Tabs
        tabs={tabs}
        activeTab={selectedTab}
        onTabChange={setSelectedTab}
      />
      <ScrollArea className='h-[calc(100dvh-93px)] px-4'>
        {selectedTab === '작성 가능한 리뷰' && <WritableReviews />}
        {selectedTab === '작성한 리뷰' && <WrittenReviews />}
      </ScrollArea>
    </div>
  );
};

export default ReviewTabs;
