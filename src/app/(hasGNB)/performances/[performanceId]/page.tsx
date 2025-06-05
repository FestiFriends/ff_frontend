import { Container } from '@/components/pages/performanceDetail';

type PerformanceDetailPageProps = {
  params: Promise<{ performanceId: string }>;
};

const PerformanceDetailPage = async ({
  params,
}: PerformanceDetailPageProps) => {
  const { performanceId } = await params;

  return (
    <div>
      <Container performanceId={performanceId} />
    </div>
  );
};

export default PerformanceDetailPage;
