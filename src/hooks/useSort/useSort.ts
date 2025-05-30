import { useState, useMemo } from 'react';
import { defaultSortMap } from '@/utils/sortPresets';

const useSort = <T>(
  data: T[],
  options?: {
    defaultKey?: string;
    customSortMap?: Record<string, (a: T, b: T) => number>;
  }
) => {
  const { defaultKey = '', customSortMap = {} } = options || {};
  const [sortKey, setSortKey] = useState(defaultKey);

  const sortFn = useMemo(
    () => customSortMap[sortKey] || defaultSortMap[sortKey],
    [sortKey, customSortMap]
  );

  const sortedData = useMemo(() => {
    if (!sortFn) return [...data];
    return [...data].sort(sortFn);
  }, [data, sortFn]);

  return {
    sortKey,
    setSortKey,
    sortedData,
  };
};

export default useSort;
