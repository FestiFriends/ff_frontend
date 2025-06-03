'use client';

import { performanceDetailApi } from '@/services/performanceDetailService';
import { Performance } from '@/types/performance';
import { useQuery } from '@tanstack/react-query';

interface PerformanceDetailLayoutProps {
  performanceId: string;
}

const PerformanceDetailLayout = ({
  performanceId,
}: PerformanceDetailLayoutProps) => {
  const {
    data: performanceDetail,
    isLoading,
    isError,
    error,
  } = useQuery<Performance>({
    queryKey: ['performanceDetail', performanceId],
    queryFn: () => performanceDetailApi.getPerformanceDetail(performanceId),
    enabled: !!performanceId,
  });

  if (isLoading) return <div>로딩중...</div>;
  if (isError) {
    console.error(error);
    return <div>데이터를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div>
      <p>공연명: {performanceDetail?.title}</p>
    </div>
  );
};

export default PerformanceDetailLayout;
