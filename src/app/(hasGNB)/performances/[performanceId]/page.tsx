import Header from '@/components/common/Header/Header';
import { Wrapper } from '@/components/pages/performanceDetail';

type PerformanceDetailPageProps = {
  params: Promise<{ performanceId: string }>;
};

const PerformanceDetailPage = async ({
  params,
}: PerformanceDetailPageProps) => {
  const { performanceId } = await params;

  return (
    <div>
      <Header title='공연 정보' />
      <Wrapper performanceId={performanceId} />
    </div>
  );
};

export default PerformanceDetailPage;
