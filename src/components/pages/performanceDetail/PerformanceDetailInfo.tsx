import Poster from '@/components/common/poster/Poster';
import { Skeleton } from '@/components/ui/skeleton';
import { Image } from '@/types/image';
import { Performance } from '@/types/performance';

interface PerformanceDetailInfoProps {
  isPending: boolean;
  performanceDetail?: Performance;
}

const PerformanceDetailInfo = ({
  isPending,
  performanceDetail,
}: PerformanceDetailInfoProps) => (
  <div className='flex w-full flex-col gap-5 px-4 pb-5'>
    {isPending ? (
      <Skeleton className='h-[60vh] w-full' />
    ) : (
      performanceDetail?.images?.map((image: Image) => (
        <Poster
          key={image.id}
          src={image.src}
          alt={image.alt || ''}
          className='aspect-[2/3] h-auto w-full'
        />
      ))
    )}
  </div>
);

export default PerformanceDetailInfo;
