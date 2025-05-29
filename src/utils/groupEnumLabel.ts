import { GroupCategoryLabels } from '@/constants/groupLabels';

export const getGroupCategoryLabels = (category: string): string =>
  GroupCategoryLabels[category];
