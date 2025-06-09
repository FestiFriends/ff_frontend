'use client';

import { useState } from 'react';
import Tabs from '@/components/common/Tabs/Tabs';
import WritableReviews from './WritableReviews';
import WrittenReviews from './WrittenReviews';

const tabs = ['작성 가능한 리뷰', '작성한 리뷰'];

const ReviewTabs = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  return (
    <div>
      <Tabs
        tabs={tabs}
        activeTab={selectedTab}
        onTabChange={setSelectedTab}
      />
      {selectedTab === '작성 가능한 리뷰' && <WritableReviews />}
      {selectedTab === '작성한 리뷰' && <WrittenReviews />}
    </div>
  );
};

export default ReviewTabs;
