import { EventColorName } from '@/types/enums';

export const EVENT_COLOR_STYLE_MAP: Record<
  EventColorName,
  { textClass: string; bgClass: string; label: string }
> = {
  red: {
    textClass: 'text-primary-red',
    bgClass: 'bg-primary-100',
    label: 'bg-primary-red',
  },
  blue: {
    textClass: 'text-blue-500',
    bgClass: 'bg-blue-100',
    label: 'bg-blue-500',
  },
  green: {
    textClass: 'text-green-500',
    bgClass: 'bg-green-100',
    label: 'bg-green-500',
  },
  yellow: {
    textClass: 'text-yellow-500',
    bgClass: 'bg-yellow-100',
    label: 'bg-yellow-500',
  },
  purple: {
    textClass: 'text-purple-500',
    bgClass: 'bg-purple-100',
    label: 'bg-purple-500',
  },
  pink: {
    textClass: 'text-pink-500',
    bgClass: 'bg-pink-100',
    label: 'bg-pink-500',
  },
};
