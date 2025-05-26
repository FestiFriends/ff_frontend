import { GenderLabels } from '@/constants/genderLabels';

export const getGenderLabels = (gender: string): string => GenderLabels[gender];
