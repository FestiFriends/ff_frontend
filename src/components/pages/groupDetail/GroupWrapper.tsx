'use client';

import { useGetGroupInfo } from '@/hooks/groupHooks/groupHooks';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import GroupBlurredContainer from './GroupBlurredContainer';
import GroupInfo from './GroupInfo';
import GroupMembers from './GroupMembers';
import GroupTabs from './GroupTabs';

interface GroupWrapperProps {
  groupId: string;
}

const GroupWrapper = ({ groupId }: GroupWrapperProps) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { data: groupInfo, isPending, isError } = useGetGroupInfo(groupId);
  const isMember = groupInfo?.data?.isMember;

  if (isError) {
    return (
      <div className='flex flex-col items-center justify-center px-4 py-5'>
        <p className='font-semibold text-gray-500'>존재하지 않는 모임입니다.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-7.5 bg-white'>
      <GroupInfo
        isPending={isPending}
        groupInfo={groupInfo?.data}
      />

      {isLoggedIn && isMember ? (
        <>
          <GroupMembers groupId={groupId} />
          <GroupTabs groupInfo={groupInfo?.data} />
        </>
      ) : (
        <GroupBlurredContainer groupInfo={groupInfo?.data} />
      )}
    </div>
  );
};

export default GroupWrapper;
