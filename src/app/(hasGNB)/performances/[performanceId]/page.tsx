import { use } from 'react';
import PerformanceDetailLayout from '@/components/pages/performanceDetail/PerformanceDetailLayout';

interface PerformanceDetailPageProps {
  params: Promise<{ performanceId: string }>;
}

const PerformanceDetailPage = ({ params }: PerformanceDetailPageProps) => {
  const { performanceId } = use(params);

  return (
    <div>
      <PerformanceDetailLayout performanceId={performanceId} />
    </div>
  );
};

export default PerformanceDetailPage;
