'use client';

import { useState } from 'react';
import GroupCard from '@/components/common/GroupCard/GroupCard';
import { groupsApi } from '@/services/groupsService';
import { DateRange } from '@/types/dateRange';
import { Group, GroupsResponse } from '@/types/group';
import { Performance } from '@/types/performance';
import { useQuery } from '@tanstack/react-query';
import { GroupsOptionTabs } from '.';

interface PerformanceDetailGroupsProps {
  performanceDetail: Performance;
}

const PerformanceDetailGroups = ({
  performanceDetail,
}: PerformanceDetailGroupsProps) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const {
    data: groups,
    isLoading,
    isError,
  } = useQuery<GroupsResponse>({
    queryKey: ['groups', performanceDetail.id],
    queryFn: () => groupsApi.getGroups(performanceDetail.id),
    enabled: !!performanceDetail.id,
  });

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>데이터를 불러오는 데 실패했습니다.</div>;

  return (
    <div>
      <GroupsOptionTabs
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <div>
        {groups.data?.groups.map((group: Group) => (
          <GroupCard
            key={group.id}
            groupData={group}
            buttonText='참가 신청'
            onButtonClick={() => console.log(group)}
            className=''
          />
        ))}
      </div>
    </div>
  );
};
export default PerformanceDetailGroups;
