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
    <div className='flex flex-col gap-3 bg-gray-25'>
      <Summary
        isPending={isPending}
        performanceDetail={performanceDetail?.data}
      />

      <Tabs
        isPending={isPending}
        performanceDetail={performanceDetail?.data}
      />
    </div>
  );
};

export default PerformanceDetailWrapper;
