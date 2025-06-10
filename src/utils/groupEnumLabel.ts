import { GroupCategoryLabels } from '@/constants/groupLabels';
import { GroupCategoryType } from '@/types/enums';

export const getGroupCategoryLabels = (category: GroupCategoryType): string =>
  GroupCategoryLabels[category];
