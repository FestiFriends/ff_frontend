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

  if (!performanceDetail?.data)
    return (
      <div className='flex h-[80dvh] flex-col items-center justify-center gap-2 px-4 py-5 md:h-[100dvh]'>
        <p className='font-semibold text-gray-500'>존재하지 않는 공연입니다.</p>
      </div>
    );

  return (
    <div className='flex flex-col gap-3 bg-gray-25'>
      <Summary
        isPending={isPending}
        performanceDetail={performanceDetail.data}
      />

      <Tabs
        isPending={isPending}
        performanceDetail={performanceDetail.data}
      />
    </div>
  );
};

export default PerformanceDetailWrapper;
