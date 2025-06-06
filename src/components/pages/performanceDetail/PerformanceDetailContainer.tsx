'use client';

import { Summary, Tabs } from '@/components/pages/performanceDetail';
import { useGetPerformanceDetail } from '@/hooks/performanceHooks/performanceHooks';

type PerformanceDetailContainerProps = {
  performanceId: string;
};

const PerformanceDetailContainer = ({
  performanceId,
}: PerformanceDetailContainerProps) => {
  const { data: performanceDetail, isPending } =
    useGetPerformanceDetail(performanceId);

  return (
    <div className='flex flex-col'>
      <Summary
        performanceDetail={performanceDetail?.data}
        isPending={isPending}
      />
      <Tabs
        performanceDetail={performanceDetail?.data}
        isPending={isPending}
      />
    </div>
  );
};

export default PerformanceDetailContainer;
