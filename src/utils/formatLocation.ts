import { LocationLabels } from '@/constants/locationLabels';

/**
 * '지역/장소' 형식의 문자열을 받아 지역명은 한글 라벨로 변환하고 장소는 그대로 반환하는 함수
 * @param location '서울/잠실체육관' 형식의 문자열
 * @returns 변환된 지역명과 장소를 포함한 객체
 */
export const formatLocation = (location: string | undefined) => {
  if (location === undefined) return { location: '', place: '' };

  const [rawLocation, place] = location.split('/');
  return {
    location: LocationLabels[rawLocation] || rawLocation,
    place,
  };
};
