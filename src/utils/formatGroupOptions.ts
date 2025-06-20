/**
 * 주어진 value가 labels에 존재하면 대응되는 label을 반환하고, 없으면 fallback을 반환하는 함수
 * @param value - 선택된 쿼리 파라미터 값
 * @param labels - value에 대응되는 label을 가진 레코드 객체
 * @param fallback - fallback으로 사용할 기본 label 문자열
 * @returns 해당 value에 해당하는 label 문자열 또는 fallback
 */
export const getLabel = <T extends string>(
  value: string | null,
  labels: Record<T, string>,
  fallback: string
): string => (value && value in labels ? labels[value as T] : fallback);

/**
 * Record 객체를 [{ value, label }] 형태의 옵션 배열로 변환하는 함수
 * @param record - 키와 문자열 값을 가진 레코드 객체
 * @returns 옵션 배열 [{ value, label }]
 */
export const mapRecordToStringOptions = <T extends string | number>(
  record: Record<T, string>
): Array<{ value: string; label: string }> =>
  (Object.entries(record) as [string, string][]).map(([value, label]) => ({
    value,
    label,
  }));

/**
 * Record 객체의 값들을 value와 label로 사용하는 옵션 배열로 변환하는 함수
 * @param record - 문자열 값을 가진 레코드 객체
 * @returns 옵션 배열 [{ value, label }], value와 label이 동일함
 */
export const mapRecordValueToOptions = <T extends string | number>(
  record: Record<T, string>
): Array<{ value: string; label: string }> =>
  (Object.values(record) as string[]).map((label) => ({
    value: label,
    label,
  }));
