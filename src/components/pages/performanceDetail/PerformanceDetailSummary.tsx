import Poster from '@/components/common/poster/Poster';
import LikeIcon from '@/components/icons/LikeIcon';
import ShareIcon from '@/components/icons/ShareIcon';
import { Performance, PerformanceDetailResponse } from '@/types/performance';
import { format } from 'date-fns';

interface PerformanceDetailSummaryProps {
  performanceDetail?: PerformanceDetailResponse;
  isPending: boolean;
}

const PerformanceDetailSummary = ({
  performanceDetail,
  isPending,
}: PerformanceDetailSummaryProps) => {
  if (isPending) return <div>Loading</div>;

  const detail: Performance = performanceDetail?.data;

  return (
    <div>
      <div className='flex items-center justify-center'>
        <Poster
          src={detail.poster || ''}
          alt={detail.title}
          className='h-100 max-h-[430px] w-full'
        />
      </div>

      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-bold'>{detail.title}</h2>
        <div>
          <button>
            <LikeIcon type='empty' />
          </button>
          <button>
            <ShareIcon />
          </button>
        </div>
      </div>

      <div>
        <div className='grid grid-cols-2'>
          <span>기간</span>
          <span>
            {format(detail.startDate, 'yy.MM.dd')} ~{' '}
            {format(detail.endDate, 'yy.MM.dd')}
          </span>
        </div>

        <div className='grid grid-cols-2'>
          <span>장소</span>
          <span>{detail.location}</span>
        </div>

        <div className='grid grid-cols-2'>
          <span>출연진</span>
          <div>
            {detail.cast.map((cast: string) => (
              <span key={cast}>{cast}</span>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-2'>
          <span>제작진</span>
          <div>
            {detail.crew?.map((crew: string) => <span key={crew}>{crew}</span>)}
          </div>
        </div>

        <div className='grid grid-cols-2'>
          <span>공연 시간</span>
          <span>{detail.runtime}</span>
        </div>

        <div className='grid grid-cols-2'>
          <span>기획사</span>
          <span>{detail.agency}</span>
        </div>

        <div className='grid grid-cols-2'>
          <span>티켓 가격</span>
          <div className='flex flex-col'>
            {detail.price.map((price: string) => (
              <span key={price}>{price}</span>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-2'>
          <span>연령</span>
          <span>{detail.age}</span>
        </div>
      </div>
    </div>
  );
};
export default PerformanceDetailSummary;
