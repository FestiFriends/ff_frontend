import { EventColorName } from '@/types/enums';

export const EVENT_COLOR_STYLE_MAP: Record<
  EventColorName,
  { textClass: string; bgClass: string }
> = {
  red: { textClass: 'text-primary-red', bgClass: 'bg-primary-100' },
  blue: { textClass: 'text-blue-500', bgClass: 'bg-blue-100' },
  green: { textClass: 'text-green-500', bgClass: 'bg-green-100' },
  yellow: { textClass: 'text-yellow-500', bgClass: 'bg-yellow-100' },
  purple: { textClass: 'text-purple-500', bgClass: 'bg-purple-100' },
  pink: { textClass: 'text-pink-500', bgClass: 'bg-pink-100' },
};
