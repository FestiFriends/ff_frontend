import { performanceDetailApi } from '@/services/performanceDetailService';

type PerformanceDetailPageProps = {
  params: Promise<{ performanceId: string }>;
};

const PerformanceDetailPage = async ({
  params,
}: PerformanceDetailPageProps) => {
  const { performanceId } = await params;

  const performanceDetail =
    await performanceDetailApi.getPerformanceDetail(performanceId);

  return (
    <div>
      <h1>공연 상세 페이지</h1>
    </div>
  );
};

export default PerformanceDetailPage;
