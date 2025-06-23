import { Performance } from '@/types/performance';

export const isPerformanceOnDate = (perf: Performance, date: Date): boolean => {
  const targetDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const start = new Date(
    new Date(perf.startDate).getFullYear(),
    new Date(perf.startDate).getMonth(),
    new Date(perf.startDate).getDate()
  );
  const end = new Date(
    new Date(perf.endDate).getFullYear(),
    new Date(perf.endDate).getMonth(),
    new Date(perf.endDate).getDate()
  );

  return targetDate >= start && targetDate <= end;
};
