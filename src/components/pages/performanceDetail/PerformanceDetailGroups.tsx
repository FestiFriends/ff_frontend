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
  const { data: groups, isPending } = useGetGroups(performanceId);

  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  return (
    <>
      {isPending ? (
        <div>loading</div>
      ) : (
        <div>
          <GroupsOptionTabs
            dateRange={dateRange}
            setDateRange={setDateRange}
          />

          <GroupsList groups={groups?.data} />

          <GroupsPagination
            performanceId={performanceId}
            groupsResponse={groups}
          />
        </div>
      )}
    </>
  );
};
export default PerformanceDetailGroups;
