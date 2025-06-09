import Poster from '@/components/common/poster/Poster';
import { Performance } from '@/types/performance';

interface PerformanceDetailInfoProps {
  performanceDetail: Performance;
}

const PerformanceDetailInfo = ({
  performanceDetail,
}: PerformanceDetailInfoProps) => (
  <div className='w-full'>
    {performanceDetail?.images?.map((image) => (
      <Poster
        key={image.id}
        src={image.src}
        alt={image.alt || ''}
        className='h-100 w-full'
      />
    ))}
  </div>
);

export default PerformanceDetailInfo;
