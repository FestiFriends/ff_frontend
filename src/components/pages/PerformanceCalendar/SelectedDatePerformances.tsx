import { format } from 'date-fns';
import { PerformanceCard } from '@/components/common';
import StateNotice from '@/components/common/StateNotice/StateNotice';
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

  return (
    <div className='mt-2 space-y-5'>
      <h2 className='text-center text-lg font-semibold'>
        {format(date, 'M월 d일')} 공연 목록
      </h2>

      {filtered.length === 0 ? (
        <StateNotice
          preset='searchEmpty'
          message='선택한 날짜에 예정된 공연이 없습니다.'
          height='5vh'
        />
      ) : filtered.length === 1 ? (
        <div className='flex justify-center'>
          <PerformanceCard
            performance={filtered[0]}
            ranking={1}
          />
        </div>
      ) : (
        <ul className='mx-auto grid w-full max-w-md grid-cols-2 justify-items-center gap-x-4 gap-y-7'>
          {filtered.map((perf, index) => (
            <PerformanceCard
              key={perf.id}
              performance={perf}
              ranking={index + 1}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectedDatePerformances;
