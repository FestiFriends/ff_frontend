import Header from '@/components/common/Header/Header';
import { Wrapper } from '@/components/pages/performanceDetail';
import { ScrollArea } from '@/components/ui/scroll-area';

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
      <ScrollArea className='h-[calc(100dvh-124px)]'>
        <div className='w-screen max-w-lg'>
          <Wrapper performanceId={performanceId} />
        </div>
      </ScrollArea>
    </div>
  );
};

export default PerformanceDetailPage;
