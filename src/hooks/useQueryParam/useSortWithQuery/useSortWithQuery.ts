import useQueryParam from '@/hooks/useQueryParam/useQueryParam';
import useSort from '@/hooks/useSort/useSort';

const useSortWithQuery = <T>(
  data: T[],
  options?: {
    defaultKey?: string;
    paramKey?: string; // 기본은 'sort'
    customSortMap?: Record<string, (a: T, b: T) => number>;
  }
) => {
  const {
    defaultKey = '',
    paramKey = 'sort',
    customSortMap = {},
  } = options || {};

  const { getQueryParam, setQueryParam } = useQueryParam();
  const initialKey = getQueryParam(paramKey) || defaultKey;

  const { sortKey, setSortKey, sortedData } = useSort(data, {
    defaultKey: initialKey,
    customSortMap,
  });

  const handleChange = (value: string) => {
    setSortKey(value);
    setQueryParam(paramKey, value);
  };

  return {
    sortKey,
    setSortKey: handleChange,
    sortedData,
  };
};

export default useSortWithQuery;
