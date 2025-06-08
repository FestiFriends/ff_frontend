import { format, isWithinInterval, parseISO, startOfDay } from 'date-fns';
import { Performance } from '@/types/performance';

interface Props {
  date: Date | null;
  performances: Performance[];
}

const SelectedDatePerformances = ({ date, performances }: Props) => {
  if (!date) return null;

  const normalizedDate = startOfDay(date);

  const filtered = performances.filter((perf) => {
    const start = startOfDay(parseISO(perf.startDate));
    const end = startOfDay(parseISO(perf.endDate));
    const within = isWithinInterval(normalizedDate, { start, end });

    console.log({
      title: perf.title,
      selectedDate: normalizedDate,
      start: parseISO(perf.startDate),
      end: parseISO(perf.endDate),
      within,
    });

    return within;
  });

  if (filtered.length === 0) {
    return (
      <p className='mt-6 text-sm text-gray-500'>
        선택한 날짜에 공연이 없습니다.
      </p>
    );
  }

  return (
    <div className='mt-6 space-y-4'>
      <h2 className='text-lg font-semibold'>
        {format(date, 'M월 d일')} 공연 목록
      </h2>
      <ul className='space-y-2'>
        {filtered.map((perf) => (
          <li
            key={perf.id}
            className='rounded border p-4 shadow-sm'
          >
            <p className='font-bold'>{perf.title}</p>
            <p className='text-sm text-gray-600'>
              {perf.location} | {perf.time.join(', ')}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedDatePerformances;
