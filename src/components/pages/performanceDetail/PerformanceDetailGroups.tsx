'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Pagination from '@/components/common/Pagination/Pagination';
import { useGetGroups } from '@/hooks/groupHooks/groupHooks';
import { DateRange } from '@/types/dateRange';
import { GetGroupsParams } from '@/types/group';
import { cleanQueryParams } from '@/utils/cleanQueryParams';
import { GroupsList, GroupsOptionTabs } from '.';

const PerformanceDetailGroups = () => {
  const { performanceId } = useParams<{ performanceId: string }>();
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

  return (
    <div className='flex flex-col gap-5 px-4 py-5'>
      <GroupsOptionTabs
        isPending={isPending}
        dateRange={filters.dateRange}
        setDateRange={(range) => updateFilter('dateRange', range)}
        setSortType={(sort) => updateFilter('sortType', sort)}
        setCategory={(category) => updateFilter('category', category)}
        setLocation={(location) => updateFilter('location', location)}
        setGender={(gender) => updateFilter('gender', gender)}
      />

      <GroupsList
        isPending={isPending}
        groupCount={groups?.data.groupCount}
        groups={groups?.data.groups}
      />

      {isPending ? (
        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
          maxVisiblePages={5}
        />
      ) : (
        <Pagination
          currentPage={currentPage}
          totalPages={groups.totalPages}
          onPageChange={setCurrentPage}
          maxVisiblePages={5}
        />
      )}
    </div>
  );
};
export default PerformanceDetailGroups;
