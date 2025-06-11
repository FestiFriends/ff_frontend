'use client';

import { useEffect, useState } from 'react';
import Pagination from '@/components/common/Pagination/Pagination';
import { useGetGroups } from '@/hooks/groupHooks/groupHooks';
import { DateRange } from '@/types/dateRange';
import { GetGroupsParams } from '@/types/group';
import { cleanQueryParams } from '@/utils/cleanQueryParams';
import { GroupsList, GroupsOptionTabs } from '.';

interface PerformanceDetailGroupsProps {
  performanceId: string;
}

const PerformanceDetailGroups = ({
  performanceId,
}: PerformanceDetailGroupsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    sortType: '',
    category: '',
    dateRange: { startDate: null, endDate: null } as DateRange,
    location: '',
    gender: '',
  });

  const updateFilter = (
    key: keyof typeof filters,
    value: (typeof filters)[keyof typeof filters]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  const filteredParams = cleanQueryParams({
    page: currentPage,
    sortType: filters.sortType,
    category: filters.category,
    startDate: filters.dateRange.startDate?.toISOString(),
    endDate: filters.dateRange.endDate?.toISOString(),
    location: filters.location,
    gender: filters.gender,
  });

  const queryParams: GetGroupsParams = {
    performanceId,
    ...filteredParams,
  };

  const { data: groups, isPending } = useGetGroups(queryParams);
  useEffect(() => {
    console.log(groups);
  }, [groups]);

  if (isPending || !groups) return <div>loading...</div>;

  return (
    <div>
      <GroupsOptionTabs
        dateRange={filters.dateRange}
        setDateRange={(range) => updateFilter('dateRange', range)}
        setSortType={(sort) => updateFilter('sortType', sort)}
        setCategory={(cat) => updateFilter('category', cat)}
        setLocation={(loc) => updateFilter('location', loc)}
        setGender={(gen) => updateFilter('gender', gen)}
      />
      <GroupsList groups={groups} />
      <Pagination
        currentPage={currentPage}
        totalPages={groups.data.totalPages}
        onPageChange={setCurrentPage}
        maxVisiblePages={5}
      />
    </div>
  );
};
export default PerformanceDetailGroups;
