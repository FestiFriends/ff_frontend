'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { format, parse, isValid } from 'date-fns';
import DatePicker from '@/components/common/DatePicker/DatePicker';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';
import { DateRange } from '@/types/dateRange';

interface PerformanceDatePickerProps {
  startDateKey?: string;
  endDateKey?: string;
  dateFormat?: string;
  resetPage?: boolean;
}

const parseDate = (
  dateString: string | null,
  dateFormat: string
): Date | null => {
  if (!dateString || dateString === 'undefined' || dateString.trim() === '') {
    return null;
  }

  try {
    const parsed = parse(dateString, dateFormat, new Date());
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const formatDate = (date: Date | null, dateFormat: string): string | null => {
  if (!date || !isValid(date)) {
    return null;
  }
  return format(date, dateFormat);
};

const PerformanceDatePicker = ({
  startDateKey = 'startDate',
  endDateKey = 'endDate',
  dateFormat = 'yyyy-MM-dd',
  resetPage = true,
}: PerformanceDatePickerProps) => {
  const { getQueryParam, setMultipleQueryParams } = useQueryParam();
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const loadDateParams = () => {
    const startDateParam = getQueryParam(startDateKey);
    const endDateParam = getQueryParam(endDateKey);

    const startDate = parseDate(startDateParam, dateFormat);
    const endDate = parseDate(endDateParam, dateFormat);

    setDateRange({
      startDate,
      endDate,
    });
  };

  useEffect(() => {
    loadDateParams();
  }, [startDateKey, endDateKey, dateFormat]);

  const handleDateChange = useCallback(
    (range: DateRange) => {
      setDateRange(range);

      const queryParams: Record<string, string | null> = {
        [startDateKey]: formatDate(range.startDate, dateFormat),
        [endDateKey]: formatDate(range.endDate, dateFormat),
      };

      if (resetPage) {
        queryParams.page = '1';
      }

      setMultipleQueryParams(queryParams);
    },
    [startDateKey, endDateKey, dateFormat, resetPage, setMultipleQueryParams]
  );

  const handleReset = useCallback(() => {
    setDateRange({
      startDate: null,
      endDate: null,
    });

    const queryParams: Record<string, string | null> = {
      [startDateKey]: null,
      [endDateKey]: null,
    };

    if (resetPage) {
      queryParams.page = '1';
    }

    setMultipleQueryParams(queryParams);
  }, [startDateKey, endDateKey, resetPage, setMultipleQueryParams]);

  const isDateSelected =
    dateRange.startDate !== null || dateRange.endDate !== null;

  return (
    <>
      <DatePicker
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        onChange={handleDateChange}
      />
      {isDateSelected && <button onClick={handleReset}>초기화</button>}
    </>
  );
};

export default PerformanceDatePicker;
