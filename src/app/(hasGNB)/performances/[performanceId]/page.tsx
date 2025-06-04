import PerformanceInfo from '@/components/pages/performanceDetail/PerformanceInfo';
import { performancesApi } from '@/services/performancesService';

type PerformanceDetailPageProps = {
  params: Promise<{ performanceId: string }>;
};

const PerformanceDetailPage = async ({
  params,
}: PerformanceDetailPageProps) => {
  const { performanceId } = await params;
  const performanceDetail =
    await performancesApi.getPerformanceDetail(performanceId);

  return (
    <div className='bg-blue-100'>
      <h1>공연 상세 페이지</h1>
      {/* <PerformanceInfo performanceDetail={performanceDetail} /> */}
    </div>
  );
};

export default PerformanceDetailPage;
