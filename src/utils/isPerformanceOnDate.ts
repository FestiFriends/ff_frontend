import { isWithinInterval, parseISO, startOfDay } from 'date-fns';
import { Performance } from '@/types/performance';

export const isPerformanceOnDate = (perf: Performance, date: Date): boolean => {
  const normalizedDate = startOfDay(date);
  const start = startOfDay(parseISO(perf.startDate));
  const end = startOfDay(parseISO(perf.endDate));
  return isWithinInterval(normalizedDate, { start, end });
};
