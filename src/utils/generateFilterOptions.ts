/**
 * Label 객체를 기반으로 필터 옵션 배열을 만들어주는 함수 (옵션에 '전체' 포함 가능)
 * @param labels 필터용 label/value 쌍을 가진 객체
 * @param includeAll '전체' 옵션 포함 여부 (기본값: true)
 * @returns 드롭다운에 사용할 label/value 형태의 옵션 배열
 */
const generateFilterOptions = <T extends Record<string, string>>(
  labels: T,
  includeAll: boolean = true
): { label: string; value: keyof T | '' }[] => {
  const options = Object.entries(labels).map(([value, label]) => ({
    label,
    value: value as keyof T,
  }));

  return includeAll ? [{ label: '전체', value: '' }, ...options] : options;
};

export default generateFilterOptions;
