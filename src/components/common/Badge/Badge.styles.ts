import { ApplicationStatus, Gender, GroupCategory } from '@/types/enums';

const bases = {
  category: 'flex items-center gap-1 text-14_M text-gray-600',
  gender: 'rounded-sm px-2 py-[3px] text-13_M',
  status: 'rounded-full px-2 py-1 text-12_B',
};

export const badgeStyles = {
  bases,

  category: {
    [GroupCategory.COMPANION]: `${bases.category}`,
    [GroupCategory.RIDE_SHARE]: `${bases.category}`,
    [GroupCategory.ROOM_SHARE]: `${bases.category}`,
  } as Record<string, string>,
  gender: {
    [Gender.MALE]: `${bases.gender} text-primary-red bg-[#FFEEEF]`,
    [Gender.FEMALE]: `${bases.gender} text-orange-400 bg-[#FFF8DD]`,
    [Gender.ALL]: `${bases.gender} text-[#6BC740] bg-[#EEFFE0]`,
  } as Record<string, string>,
  status: {
    [ApplicationStatus.PENDING]: `${bases.status} text-[#0D6CD1] bg-[#DAF0FF]`,
    [ApplicationStatus.ACCEPTED]: `${bases.status} text-[#2BA90D] bg-[#E9FBE4]`,
    [ApplicationStatus.REJECTED]: `${bases.status} text-[#F96767] bg-[#FCECEA]`,
    [ApplicationStatus.CONFIRMED]: `${bases.status} text-[#FF468A] bg-[#FFEDF6]`,
  } as Record<string, string>,

  host: `${bases.status} text-yellow-600 bg-yellow-100`,
} as const;
