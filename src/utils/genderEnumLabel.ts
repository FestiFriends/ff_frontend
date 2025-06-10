import { GenderLabels } from '@/constants/genderLabels';
import { GenderType } from '@/types/enums';

export const getGenderLabels = (gender: GenderType): string =>
  GenderLabels[gender];
