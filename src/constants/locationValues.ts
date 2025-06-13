import { Location, LocationType } from '@/types/enums';

export const LocationValues: Record<LocationType, string> = {
  [Location.SEOUL]: '서울특별시',
  [Location.BUSAN]: '부산광역시',
  [Location.DAEGU]: '대구광역시',
  [Location.INCHEON]: '인천광역시',
  [Location.GWANGJU]: '광주광역시',
  [Location.DAEJEON]: '대전광역시',
  [Location.ULSAN]: '울산광역시',
  [Location.GYEONGGI]: '경기도',
  [Location.CHUNGBUK]: '충청북도',
  [Location.CHUNGNAM]: '충청남도',
  [Location.JEONBUK]: '전라북도',
  [Location.JEONNAM]: '전라남도',
  [Location.GYEONGBUK]: '경상북도',
  [Location.GYEONGNAM]: '경상남도',
  [Location.SEJONG]: '세종특별자치시',
  [Location.JEJU]: '제주특별자치도',
  [Location.GANGWON]: '강원도',
};
