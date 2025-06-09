'use client';

import { Summary, Tabs } from '@/components/pages/performanceDetail';
import { Skeleton } from '@/components/ui/skeleton';
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
      {isPending ? (
        <div className='flex flex-col gap-5 bg-white px-4 pt-5 pb-7.5'>
          <Skeleton className='h-[60vh] w-full rounded-xl' />
          <div className='flex flex-col gap-5'>
            <Skeleton className='h-6 w-full' />
            <div className='flex flex-col gap-3'>
              <Skeleton className='h-4 w-[60vw]' />
              <Skeleton className='h-4 w-[45vw]' />
              <Skeleton className='h-4 w-[70vw]' />
            </div>
          </div>
        </div>
      ) : (
        <Summary performanceDetail={performanceDetail?.data} />
      )}

      <Tabs
        isPending={isPending}
        performanceDetail={performanceDetail?.data}
      />
    </div>
  );
};

export default PerformanceDetailWrapper;
