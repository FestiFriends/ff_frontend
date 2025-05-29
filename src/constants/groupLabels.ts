import { GroupCategory } from '@/types/enums';

export const GroupCategoryLabels: Record<string, string> = {
  [GroupCategory.COMPANION]: '같이 동행',
  [GroupCategory.RIDE_SHARE]: '같이 탑승',
  [GroupCategory.ROOM_SHARE]: '같이 숙박',
};
