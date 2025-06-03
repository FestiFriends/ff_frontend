import {
  format,
  parseISO,
  isAfter,
  isBefore,
  differenceInDays,
  isWithinInterval,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { Performance } from '@/types/performance';

const formatPerformanceData = (performance: Performance, locale = ko) => {
  const startDate = parseISO(performance.startDate);
  const endDate = parseISO(performance.endDate);
  const now = new Date();

  const formattedStartDate = format(startDate, 'yyyy.MM.dd', { locale });
  const formattedEndDate = format(endDate, 'yyyy.MM.dd', { locale });

  const dateRange =
    formattedStartDate === formattedEndDate
      ? formattedStartDate
      : `${formattedStartDate} - ${formattedEndDate}`;

  const daysUntilStart = differenceInDays(startDate, now);
  const isOngoing = isWithinInterval(now, { start: startDate, end: endDate });
  const isUpcoming = isAfter(startDate, now);
  const isEnded = isBefore(endDate, now);

  const STATUS_MESSAGES = {
    ENDED: '공연 종료',
    ONGOING: '공연 중',
    SCHEDULED: '공연 예정',
    D_DAY: (days: number) => `D-${days}`,
  };

  const status = (() => {
    if (isEnded) return STATUS_MESSAGES.ENDED;
    if (isOngoing) return STATUS_MESSAGES.ONGOING;
    if (daysUntilStart <= 7) return STATUS_MESSAGES.D_DAY(daysUntilStart);
    return STATUS_MESSAGES.SCHEDULED;
  })();

  const prices = performance.price
    .map((p) => parseInt(p.replace(/[^\d]/g, '')))
    .filter((p) => !isNaN(p))
    .sort((a, b) => a - b);

  const priceRange = (() => {
    if (prices.length === 0) return '가격 미정';
    if (prices.length === 1) return `${prices[0].toLocaleString()}원`;
    return `${prices[0].toLocaleString()}원 - ${prices[prices.length - 1].toLocaleString()}원`;
  })();

  const CAST_MAX_NUM = 2;

  const castSummary = ((cast: string[]) => {
    if (cast.length === 0) return '출연진 미정';
    if (cast.length <= CAST_MAX_NUM) return cast.join(', ');
    return `${cast.slice(0, CAST_MAX_NUM).join(', ')} 외 ${cast.length - CAST_MAX_NUM}명`;
  })(performance.cast);

  const mainImage = performance.poster || performance.imgs?.[0]?.src;

  return {
    id: performance.id,
    title: performance.title,
    location: performance.location,
    runtime: performance.runtime,
    age: performance.age,

    dateRange,
    status,
    priceRange,
    castSummary,
    mainImage,

    isOngoing,
    isUpcoming,
    isEnded,
    isTicketAvailable: performance.state === 'available',

    startDate,
    endDate,
    formattedStartDate,
    formattedEndDate,
    daysUntilStart,

    getDetailUrl: () => `/performances/${performance.id}`,
  };
};

export default formatPerformanceData;
