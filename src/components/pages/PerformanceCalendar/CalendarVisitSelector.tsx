'use client';

import CustomSortDropdown from '@/components/pages/performances/CustomSortDropdown';

const VISIT_OPTIONS = [
  { label: '내한', value: '내한' },
  { label: '국내', value: '국내' },
];

interface Props {
  className?: string;
}

const CalendarVisitTypeDropdown = ({ className }: Props) => (
  <CustomSortDropdown
    queryKey='visit'
    placeholder='유형'
    options={VISIT_OPTIONS}
    width='fit'
    className={className}
  />
);

export default CalendarVisitTypeDropdown;
