'use client';

import { useState } from 'react';
import { useGetGroups } from '@/hooks/groupHooks/groupHooks';
import { DateRange } from '@/types/dateRange';
import { GetGroupsParams } from '@/types/group';
import { cleanQueryParams } from '@/utils/cleanQueryParams';
import { GroupsList, GroupsOptionTabs, GroupsPagination } from '.';

interface PerformanceDetailGroupsProps {
  performanceId: string;
}

const PerformanceDetailGroups = ({
  performanceId,
}: PerformanceDetailGroupsProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortType, setSortType] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [location, setLocation] = useState<string>('');
  const [gender, setGender] = useState<string>('');

  const filteredParams = cleanQueryParams({
    page: currentPage,
    sortType,
    category,
    startDate: dateRange.startDate?.toISOString(),
    endDate: dateRange.endDate?.toISOString(),
    location,
    gender,
  });

  const queryParams: GetGroupsParams = {
    performanceId,
    ...filteredParams,
  };

  const { data: groups, isPending } = useGetGroups(queryParams);

  if (isPending || !groups?.data) return <div>loading...</div>;

  return (
    <div>
      <GroupsOptionTabs
        dateRange={dateRange}
        setDateRange={setDateRange}
        setSortType={setSortType}
        setCategory={setCategory}
        setLocation={setLocation}
        setGender={setGender}
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
