'use client';

import { useState } from 'react';
import Tabs from '@/components/common/Tabs/Tabs';
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
      <div className='h-full px-4 pt-5'>
        {selectedTab === '작성 가능한 리뷰' && <WritableReviews />}
        {selectedTab === '작성한 리뷰' && <WrittenReviews />}
      </div>
    </div>
  );
};

export default ReviewTabs;
