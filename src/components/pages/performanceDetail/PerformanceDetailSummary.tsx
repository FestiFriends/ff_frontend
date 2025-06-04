import Poster from '@/components/common/poster/Poster';
import LikeIcon from '@/components/icons/LikeIcon';
import ShareIcon from '@/components/icons/ShareIcon';
import { Performance } from '@/types/performance';
import { format } from 'date-fns';

interface PerformanceDetailSummaryProps {
  performanceDetail: Performance;
}

const PerformanceDetailSummary = ({
  performanceDetail,
}: PerformanceDetailSummaryProps) => (
  <div>
    <div className='flex items-center justify-center'>
      <Poster
        src={performanceDetail.poster || ''}
        alt={performanceDetail.title}
        className='h-100 max-h-[430px] w-full'
      />
    </div>

    <div className='flex items-center justify-between'>
      <h2>{performanceDetail.title}</h2>
      <div>
        <button>
          <LikeIcon />
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
          {format(performanceDetail.startDate, 'yy.MM.dd')} ~{' '}
          {format(performanceDetail.endDate, 'yy.MM.dd')}
        </span>
      </div>

      <div className='grid grid-cols-2'>
        <span>장소</span>
        <span>{performanceDetail.location}</span>
      </div>

      <div className='grid grid-cols-2'>
        <span>출연진</span>
        <div>
          {performanceDetail.cast.map((cast: string) => (
            <span key={cast}>{cast}</span>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-2'>
        <span>제작진</span>
        <div>
          {performanceDetail.crew?.map((crew: string) => (
            <span key={crew}>{crew}</span>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-2'>
        <span>공연 시간</span>
        <span>{performanceDetail.runtime}</span>
      </div>

      <div className='grid grid-cols-2'>
        <span>기획사</span>
        <span>{performanceDetail.agency}</span>
      </div>

      <div className='grid grid-cols-2'>
        <span>티켓 가격</span>
        <div className='flex flex-col'>
          {performanceDetail.price.map((price: string) => (
            <span key={price}>{price}</span>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-2'>
        <span>연령</span>
        <span>{performanceDetail.age}</span>
      </div>
    </div>
  </div>
);

export default PerformanceDetailSummary;
