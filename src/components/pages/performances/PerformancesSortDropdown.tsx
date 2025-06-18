'use client';
import React from 'react';
import SortDropdown, {
  SortOption,
} from '@/components/common/SortDropdown/SortDropdown';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';
import useSortWithQuery from '@/hooks/useSortWithQuery/useSortWithQuery';
import { cn } from '@/lib/utils';

interface PerformanceSortDropdownProps {
  options?: SortOption[];
  queryKey: string;
  placeholder?: string;
  defaultValue?: string;
  data?: unknown[];
  fullSize?: boolean;
  className?: string;
}

const PerformanceSortDropdown = ({
  options,
  queryKey,
  placeholder = '정렬',
  defaultValue = '',
  data = [],
  fullSize = false,
  className,
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
    <div className={cn('z-20', className)}>
      <SortDropdown
        options={sortOptions}
        defaultValue={sortKey}
        onChange={handleSortChange}
        placeholder={placeholder}
        initialValue={initialValue}
      />
    </div>
  );
};

export default PerformanceSortDropdown;
