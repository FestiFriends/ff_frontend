import { format, formatISO, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

// mm전, hh시간전, dd일전, M월 d일
export const formatRelativeDate = (dateStr: string): string => {
  if (!dateStr) return '';

  const parsedDate = parseISO(dateStr.trim());
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - parsedDate.getTime()) / 1000
  );

  if (diffInSeconds < 60) {
    return '방금';
  }

  if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}분 전`;
  }

  if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  }

  return format(parsedDate, 'M월 d일', { locale: ko });
};

// M월 d일 a hh:mm
export const formatPostDate = (dateStr: string): string => {
  if (!dateStr) {
    return '';
  }

  try {
    const parsedDate = parseISO(dateStr.trim());
    const formatted = format(parsedDate, 'M월 d일 a hh:mm', { locale: ko });
    return formatted;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateStr;
  }
};

// yy.MM.dd
export const formatNormalDate = (date: string | Date) =>
  format(new Date(date), 'yy.MM.dd', { locale: ko });

export const formatToKST = (isoString: string) => {
  const date = new Date(isoString);
  const kstTimestamp = date.getTime() - 9 * 60 * 60 * 1000;
  return kstTimestamp;
};

export const formatScheduleDate = (date: Date, time: Date) => {
  const dateString = formatISO(date);
  const timeString = formatISO(time);

  const formattedDate = dateString.split('T')[0];
  const formattedTime = timeString.split('T')[1];

  const newDate = formattedDate + 'T' + formattedTime;

  return newDate;
};
