import { Gender, GenderType } from '@/types/enums';

export const GenderLabels: Record<GenderType, string> = {
  [Gender.MALE]: '남성',
  [Gender.FEMALE]: '여성',
  [Gender.ALL]: '혼성',
};
