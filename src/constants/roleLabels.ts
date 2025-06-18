import { Role, RoleType } from '@/types/enums';

export const RoleLabels: Record<RoleType, string> = {
  [Role.HOST]: '모임장',
  [Role.MEMBER]: '모임원',
};
