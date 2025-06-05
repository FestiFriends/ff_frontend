import { eachDayOfInterval, format } from 'date-fns';
import { Performance } from '@/types/performance';

const getEventsByDate = (
  performances: Performance[]
): Record<string, Performance[]> => {
  const map: Record<string, Performance[]> = {};

  performances.forEach((perf) => {
    const start = new Date(perf.startDate);
    const end = new Date(perf.endDate);

    const daysInRange = eachDayOfInterval({ start, end });

    daysInRange.forEach((day) => {
      const key = format(day, 'yyyy-MM-dd');
      if (!map[key]) map[key] = [];
      map[key].push(perf);
    });
  });

  return map;
};

export default getEventsByDate;
