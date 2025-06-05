'use client';

import { Summary, Tabs } from '@/components/pages/performanceDetail';
import { performancesApi } from '@/services/performancesService';
import { Performance, PerformanceDetailResponse } from '@/types/performance';
import { useQuery } from '@tanstack/react-query';

type PerformanceDetailContainerProps = {
  performanceId: string;
};

const PerformanceDetailContainer = ({
  performanceId,
}: PerformanceDetailContainerProps) => {
  const {
    data: performanceDetail,
    isLoading,
    isError,
  } = useQuery<PerformanceDetailResponse>({
    queryKey: ['performanceDetail', performanceId],
    queryFn: () => performancesApi.getPerformanceDetail(performanceId),
    enabled: !!performanceId,
  });

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>데이터를 불러오는 데 실패했습니다.</div>;

  return (
    <div className='flex flex-col'>
      <Summary performanceDetail={performanceDetail?.data as Performance} />
      <Tabs performanceDetail={performanceDetail?.data as Performance} />
    </div>
  );
};

export default PerformanceDetailContainer;
