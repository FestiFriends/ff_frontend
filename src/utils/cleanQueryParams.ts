/**
 * 쿼리 파라미터 객체에서 null, 빈 문자열, undefined를 제거하고
 * Date 객체는 ISO 문자열로 변환한 새 객체를 반환하는 함수
 * @param params 필터링할 쿼리 파라미터 객체
 * @returns 필터링 및 변환된 새 쿼리 파라미터 객체
 */
export const cleanQueryParams = <T extends Record<string, unknown>>(
  params: T
): Partial<T> =>
  Object.entries(params).reduce((acc, [key, value]) => {
    if (value !== null && value !== '' && value !== undefined) {
      acc[key as keyof T] = (
        value instanceof Date ? value.toISOString() : value
      ) as T[keyof T];
    }
    return acc;
  }, {} as Partial<T>);
