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

  if (isPending || !performanceDetail?.data) return <div>loading...</div>;

  return (
    <div className='flex flex-col gap-3'>
      <Summary performanceDetail={performanceDetail?.data} />
      <Tabs performanceDetail={performanceDetail?.data} />
    </div>
  );
};

export default PerformanceDetailWrapper;
