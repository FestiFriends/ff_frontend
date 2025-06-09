'use client';
import React, { useEffect, useState } from 'react';
import SortDropdown from '@/components/common/SortDropdown/SortDropdown';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';

export interface SortOption {
  label: string;
  value: string;
}

const DEFAULT_SORT_OPTIONS: SortOption[] = [
  { label: '최신순', value: 'latest' },
  { label: '인기순', value: 'popular' },
  { label: '이름순', value: 'name' },
];

interface PerformanceSortDropdownProps {
  options?: SortOption[];
  queryKey: string;
  placeholder?: string;
  defaultValue?: string;
  resetPage?: boolean;
}

const PerformanceSortDropdown = ({
  options,
  queryKey,
  placeholder = '정렬',
  defaultValue = '',
  resetPage = true,
}: PerformanceSortDropdownProps) => {
  const { getQueryParam, setMultipleQueryParams } = useQueryParam();
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  const sortOptions = options || DEFAULT_SORT_OPTIONS;

  useEffect(() => {
    const paramValue = getQueryParam(queryKey);
    if (paramValue && paramValue !== 'undefined') {
      setSelectedValue(paramValue);
    } else if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, [getQueryParam, queryKey, defaultValue]);

  const handleSortChange = (value: string) => {
    setSelectedValue(value);

    if (!value || value === 'undefined') {
      setMultipleQueryParams({
        [queryKey]: null,
        ...(resetPage && { page: '1' }),
      });
      return;
    }

    const queryParams: Record<string, string | null> = {
      [queryKey]: value,
    };

    if (resetPage) {
      queryParams.page = '1';
    }

    setMultipleQueryParams(queryParams);
  };

  return (
    <SortDropdown
      options={sortOptions}
      defaultValue={selectedValue}
      onChange={handleSortChange}
      placeholder={placeholder}
    />
  );
};

export default PerformanceSortDropdown;
