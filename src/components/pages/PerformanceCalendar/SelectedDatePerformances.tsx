import { format } from 'date-fns';
import PerformanceCard from '@/components/common/PerformanceCard';
import { Performance } from '@/types/performance';
import { isPerformanceOnDate } from '@/utils/isPerformanceOnDate';

interface Props {
  date: Date;
  performances: Performance[];
  onCardClick?: (perf: Performance) => void;
  onLikeClick?: (perf: Performance) => void;
  isLiked?: (perf: Performance) => boolean;
}

const SelectedDatePerformances = ({ date, performances }: Props) => {
  const filtered = performances.filter((perf) =>
    isPerformanceOnDate(perf, date)
  );

  if (filtered.length === 0) {
    return (
      <div className='mt-6 min-h-[850px] space-y-4'>
        <h2 className='text-lg font-semibold'>
          {format(date, 'M월 d일')} 공연 목록
        </h2>
        <p className='text-sm text-gray-500'>
          선택한 날짜에 예정된 공연이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className='mt-6 min-h-[850px] space-y-4'>
      <h2 className='text-lg font-semibold'>
        {format(date, 'M월 d일')} 공연 목록
      </h2>
      <ul className='space-y-2'>
        {filtered.map((perf, index) => (
          <PerformanceCard
            key={perf.id}
            performance={perf}
            ranking={index + 1}
          />
        ))}
      </ul>
    </div>
  );
};

export default SelectedDatePerformances;
