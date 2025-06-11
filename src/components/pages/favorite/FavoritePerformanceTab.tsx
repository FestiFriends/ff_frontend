import React from 'react';
import PerformanceCard from '@/components/common/PerformanceCard';
import { Performance } from '@/types/performance';
import TabContentWrapper from './FavoriteTabPanelWrapper';

interface FavoritePerformanceTabContentProps {
  performances: Performance[];
}

const EMPTY_MESSAGE = '즐겨찾기한 공연이 없습니다.';

const EmptyState = ({ message }: { message: string }) => (
  <div className='col-span-2 py-8 text-center text-gray-500'>{message}</div>
);

export const FavoritePerformanceTabContent: React.FC<
  FavoritePerformanceTabContentProps
> = ({ performances }) => (
  <TabContentWrapper>
    {performances.map((performance) => (
      <PerformanceCard
        key={performance.id}
        performance={performance}
      />
    ))}
    {performances.length === 0 && <EmptyState message={EMPTY_MESSAGE} />}
  </TabContentWrapper>
);
