import { GroupSort, GroupSortType } from '@/types/enums';

export const GroupSortLabels: Record<GroupSortType, string> = {
  [GroupSort.DATE_ASC]: '가까운 날짜순',
  [GroupSort.DATE_DESC]: '먼 날짜순',
};
