'use client';
import React from 'react';
import SortDropdown, {
  SortOption,
} from '@/components/common/SortDropdown/SortDropdown';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';
import useSortWithQuery from '@/hooks/useSortWithQuery/useSortWithQuery';

interface PerformanceSortDropdownProps {
  options?: SortOption[];
  queryKey: string;
  placeholder?: string;
  defaultValue?: string;
  data?: unknown[];
}

const PerformanceSortDropdown = ({
  options,
  queryKey,
  placeholder = '정렬',
  defaultValue = '',
  data = [],
}: PerformanceSortDropdownProps) => {
  const sortOptions = options || [];
  const { getQueryParam } = useQueryParam();
  const initialValue = getQueryParam(queryKey) || '';

  const { sortKey, setSortKey } = useSortWithQuery(data, {
    defaultKey: defaultValue,
    paramKey: queryKey,
  });

  const handleSortChange = (value: string) => {
    if (!value || value === 'undefined') {
      setSortKey('');
      return;
    }
    setSortKey(value);
  };

  return (
    <SortDropdown
      options={sortOptions}
      defaultValue={sortKey}
      onChange={handleSortChange}
      placeholder={placeholder}
      initialValue={initialValue}
    />
  );
};

export default PerformanceSortDropdown;
