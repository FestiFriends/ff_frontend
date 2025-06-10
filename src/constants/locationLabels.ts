import { Location, LocationType } from '@/types/enums';

export const LocationLabels: Record<LocationType, string> = {
  [Location.SEOUL]: '서울',
  [Location.BUSAN]: '부산',
  [Location.DAEGU]: '대구',
  [Location.INCHEON]: '인천',
  [Location.GWANGJU]: '광주',
  [Location.DAEJEON]: '대전',
  [Location.ULSAN]: '울산',
  [Location.GYEONGGI]: '경기',
  [Location.CHUNGBUK]: '충북',
  [Location.CHUNGNAM]: '충남',
  [Location.JEONBUK]: '전북',
  [Location.JEONNAM]: '전남',
  [Location.GYEONGBUK]: '경북',
  [Location.GYEONGNAM]: '경남',
  [Location.SEJONG]: '세종',
  [Location.JEJU]: '제주',
  [Location.GANGWON]: '강원',
};
