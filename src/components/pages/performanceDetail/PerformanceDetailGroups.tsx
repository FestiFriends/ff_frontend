'use client';

import { useState } from 'react';
import { useGetGroups } from '@/hooks/groupHooks/groupHooks';
import { DateRange } from '@/types/dateRange';
import { GroupsList, GroupsOptionTabs, GroupsPagination } from '.';

interface PerformanceDetailGroupsProps {
  performanceId: string;
}

const PerformanceDetailGroups = ({
  performanceId,
}: PerformanceDetailGroupsProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const { data: groups, isPending } = useGetGroups(
    performanceId,
    currentPage,
    3
  );

  if (isPending || !groups?.data) return <div>loading...</div>;

  return (
    <div>
      <GroupsOptionTabs
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <GroupsList groups={groups.data.groups} />

      <GroupsPagination
        groups={groups}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
export default PerformanceDetailGroups;
