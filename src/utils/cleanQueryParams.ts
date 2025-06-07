/**
 * params 객체에서 null, '', undefined 값들을 필터링하고 Date는 ISO 문자열로 변환해 새로운 객체로 만드는 함수
 * @param params
 * @returns reducedParams
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
