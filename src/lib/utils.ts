import Filter from 'badwords-ko';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const filter = new Filter();

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// 욕설 포함된 text인지 확인(boolean값으로 return됨)
export const hasProfanity = (text: string) => filter.isProfane(text);
