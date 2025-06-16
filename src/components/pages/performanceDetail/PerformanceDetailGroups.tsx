'use client';

import { useParams } from 'next/navigation';
import Pagination from '@/components/common/Pagination/Pagination';
import { useGetGroups } from '@/hooks/groupHooks/groupHooks';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';
import { GetGroupsParams } from '@/types/group';
import { GroupsList, GroupsOptionTabs } from '.';

const PerformanceDetailGroups = () => {
  const { performanceId } = useParams<{ performanceId: string }>();
  const { getQueryParam, setQueryParam } = useQueryParam();

  const page = Number(getQueryParam('page')) || 1;
  const sort = getQueryParam('sort') || 'date_asc';
  const category = getQueryParam('category');
  const startDate = getQueryParam('startDate');
  const endDate = getQueryParam('endDate');
  const location = getQueryParam('location');
  const gender = getQueryParam('gender');

  const queryParams: GetGroupsParams = {
    performanceId,
    page,
    size: 20,
    sort,
    category,
    startDate,
    endDate,
    location,
    gender,
  };

  const { data: groups, isPending } = useGetGroups(queryParams);

  return (
    <div className='flex flex-col gap-5 px-4 py-5'>
      <GroupsOptionTabs isPending={isPending} />

      <GroupsList
        isPending={isPending}
        groups={groups}
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
          currentPage={page}
          totalPages={groups?.data.totalPages || 1}
          onPageChange={(value: number) =>
            setQueryParam('page', value.toString(), 'performanceDetailTab')
          }
          maxVisiblePages={5}
        />
      )}
    </div>
  );
};
export default PerformanceDetailGroups;
