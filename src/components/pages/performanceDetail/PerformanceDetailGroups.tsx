import { groupsApi } from '@/services/groupsService';
import { GroupsResponse } from '@/types/group';
import { Performance } from '@/types/performance';
import { useQuery } from '@tanstack/react-query';

interface PerformanceDetailGroupsProps {
  performanceDetail: Performance;
}

const PerformanceDetailGroups = ({
  performanceDetail,
}: PerformanceDetailGroupsProps) => {
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

  console.log(groups);

  return (
    <div>
      <span>공연 모임 목록</span>
    </div>
  );
};
export default PerformanceDetailGroups;
