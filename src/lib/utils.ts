import Filter from 'badwords-ko';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const filter = new Filter();

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// 욕설 포함된 text인지 확인(boolean값으로 return됨)
export const hasProfanity = (text: string) => filter.isProfane(text);

/**
 * 두 숫자로 이루어진 range 값을 항상 [min, max] 형태로 정렬하는 함수
 * @param value
 * @returns [number, number]
 */
export const sortRangeValues = (value: [number, number]): [number, number] => [
  Math.min(value[0], value[1]),
  Math.max(value[0], value[1]),
];

export const scrollToTop = () => {
  console.log('scrollToTop');
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }
};
