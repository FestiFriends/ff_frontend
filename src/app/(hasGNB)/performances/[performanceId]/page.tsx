import { Summary, Tabs } from '@/components/pages/performanceDetail';
import { performancesApi } from '@/services/performancesService';
import { Performance } from '@/types/performance';

type PerformanceDetailPageProps = {
  params: Promise<{ performanceId: string }>;
};

const PerformanceDetailPage = async ({
  params,
}: PerformanceDetailPageProps) => {
  const { performanceId } = await params;
  const performanceDetail: Performance =
    await performancesApi.getPerformanceDetail(performanceId);

  return (
    <div className='bg-blue-100'>
      <Summary performanceDetail={performanceDetail} />
      <Tabs performanceDetail={performanceDetail} />
    </div>
  );
};

export default PerformanceDetailPage;
