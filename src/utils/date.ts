import { format, parseISO } from 'date-fns';
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
  console.log('formatPostDate input:', dateStr);
  if (!dateStr) {
    console.log('dateStr is empty');
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

export const formatToKST = (isoString: string) => {
  const timeString = isoString.split('T')[1].slice(0, 5);
  const hour = Number(timeString.split(':')[0]);
  const meridiem = hour < 12 ? '오전' : '오후';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const paddedHour = hour12.toString().padStart(2, '0');
  const minute = timeString.split(':')[1];
  return `${meridiem} ${paddedHour}:${minute}`;
};

// yy.MM.dd
export const formatNormalDate = (date: string | Date) =>
  format(new Date(date), 'yy.MM.dd', { locale: ko });
