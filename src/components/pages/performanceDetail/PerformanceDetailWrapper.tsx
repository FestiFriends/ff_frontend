'use client';

import { Summary, Tabs } from '@/components/pages/performanceDetail';
import { useGetPerformanceDetail } from '@/hooks/performanceHooks/performanceHooks';

type PerformanceDetailWrapperProps = {
  performanceId: string;
};

const PerformanceDetailWrapper = ({
  performanceId,
}: PerformanceDetailWrapperProps) => {
  const { data: performanceDetail, isPending } =
    useGetPerformanceDetail(performanceId);

  return (
    <div className='flex flex-col'>
      <Summary
        performanceDetail={performanceDetail?.data}
        isPending={isPending}
      />
      <Tabs
        performanceId={performanceId}
        performanceDetail={performanceDetail?.data}
        isPending={isPending}
      />
    </div>
  );
};

export default PerformanceDetailWrapper;
