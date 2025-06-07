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
  const [sortType, setSortType] = useState<string>('latest');
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const { data: groups, isPending } = useGetGroups({
    performanceId,
    page: currentPage,
    sortType,
  });

  if (isPending || !groups?.data) return <div>loading...</div>;

  return (
    <div>
      <GroupsOptionTabs
        dateRange={dateRange}
        setDateRange={setDateRange}
        setSortType={setSortType}
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
