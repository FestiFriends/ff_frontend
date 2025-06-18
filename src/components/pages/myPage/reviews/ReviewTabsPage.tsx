'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Tabs } from '@/components/common';
import { reviewTabLabel, ReviewTabLabelType } from '@/types/tabs';
import WritableReviewList from './WritableReviewList';
import WrittenReviewList from './WrittenReviewList';

const tabList: ReviewTabLabelType[] = [
  reviewTabLabel.WRITABLE_REVIEW,
  reviewTabLabel.WRITTEN_REVIEW,
  reviewTabLabel.RECEIVED_REVIEW,
];

const tabMap: Record<string, ReviewTabLabelType> = {
  writable: reviewTabLabel.WRITABLE_REVIEW,
  written: reviewTabLabel.WRITTEN_REVIEW,
  received: reviewTabLabel.RECEIVED_REVIEW,
};

const reverseTabMap: Record<ReviewTabLabelType, string> = {
  [reviewTabLabel.WRITABLE_REVIEW]: 'writable',
  [reviewTabLabel.WRITTEN_REVIEW]: 'written',
  [reviewTabLabel.RECEIVED_REVIEW]: 'received',
};

const ReviewTabsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabQuery = searchParams.get('tab') ?? 'writable';
  const initialTab = tabMap[tabQuery] ?? reviewTabLabel.WRITABLE_REVIEW;

  const [activeTab, setActiveTab] = useState<ReviewTabLabelType>(initialTab);

  const handleTabChange = (tab: string) => {
    if (!tabList.includes(tab as ReviewTabLabelType)) return;
    const typedTab = tab as ReviewTabLabelType;
    setActiveTab(typedTab);
    const queryValue = reverseTabMap[typedTab];
    router.replace(`/mypage/reviews?tab=${queryValue}`);
  };

  useEffect(() => {
    const newTab = tabMap[tabQuery] ?? reviewTabLabel.WRITABLE_REVIEW;
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
        {activeTab === reviewTabLabel.WRITABLE_REVIEW && <WritableReviewList />}
        {activeTab === reviewTabLabel.WRITTEN_REVIEW && <WrittenReviewList />}
      </div>
    </main>
  );
};

export default ReviewTabsPage;
